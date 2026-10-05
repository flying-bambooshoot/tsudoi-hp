// Google アナリティクス（GA4）にイベントを送る。
// gtag は public/index.html で本番ドメインのときだけ読み込まれるため、
// ローカル開発中などで gtag が無い場合は何もしない。
export const trackEvent = (name, params = {}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
};
