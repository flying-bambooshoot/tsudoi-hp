import { useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";

// ページを移ったときのスクロール位置を決める（サイト内でスクロールを扱うのはここだけ）。
// - リンクで移ったとき（PUSH・REPLACE）: ページの先頭を表示する
// - ブラウザの「戻る」「進む」（POP）: そのページを前に見ていたときの位置に戻す
//   （例: NEWS 一覧 → 記事 →「戻る」で、一覧の読んでいた位置に戻る）
// 位置は履歴の 1 件ごと（location.key）に覚える。ページを再読み込みしたときは覚えていないので先頭になる。

const positions = new Map();

// 前の位置に戻す。戻した直後はページの下のほう（写真やギャラリー）がまだ描かれておらず、ページが短いため
// 途中までしか戻れないことがある。届くまで、最大 1 秒、画面の描き直しごとに合わせ直す。
// その間に利用者が自分でスクロールしようとしたら、合わせ直しはやめる。
const restore = (target) => {
  const deadline = Date.now() + 1000;
  let frame;
  const stop = () => {
    cancelAnimationFrame(frame);
    ["wheel", "touchstart", "keydown"].forEach((type) => window.removeEventListener(type, stop));
  };
  ["wheel", "touchstart", "keydown"].forEach((type) => window.addEventListener(type, stop, { passive: true }));
  const step = () => {
    window.scrollTo(0, target);
    if (Math.abs(window.scrollY - target) < 2 || Date.now() > deadline) return stop();
    frame = requestAnimationFrame(step);
  };
  step();
  return stop;
};

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  // 今表示しているページの履歴の key（スクロールの記録先）
  const currentKey = useRef(location.key);

  // ブラウザが自分で位置を戻す動きを止める（画面を組み立てる前に戻されて、位置がずれるため）
  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  // 今のページのスクロール位置を覚えておく。記録先は currentKey で決めるので、
  // ページが切り替わった直後のスクロールが前のページの位置として残ることはない
  useEffect(() => {
    const save = () => positions.set(currentKey.current, window.scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, []);

  // 画面が描かれる前に位置を決める（先頭に一瞬表示されてから移る、というちらつきを防ぐ）
  useLayoutEffect(() => {
    currentKey.current = location.key;
    const saved = navigationType === "POP" ? positions.get(location.key) : undefined;
    if (!saved) {
      window.scrollTo(0, 0);
      return undefined;
    }
    // 次のページへ移ったら、合わせ直しをやめる
    return restore(saved);
  }, [location.key, navigationType]);

  return null;
};

export default ScrollToTop;
