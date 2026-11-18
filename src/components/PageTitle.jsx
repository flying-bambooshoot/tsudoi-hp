import { useEffect } from "react";
import { useI18n } from "../i18n";
import pageTitles from "../data/pageTitles.json";

// サイト内のリンクでページを移ったときに、ブラウザのタブのタイトルをそのページのものにする。
// 最初に開いたページのタイトルは scripts/postbuild.js が HTML に書き込んでいるが、そのあとサイト内で移ると
// 最初のページのタイトルのまま残る。GA4 は移るたびにその時点のタイトルを page_title として記録するので、
// これが無いとどのページも同じ名前で記録される。
// タイトルは scripts/pages.js と同じ（ページ名は src/data/pageTitles.json、TOP はサイト名）。
// NEWS の記事と 404 のページは、それぞれのページの中でタイトルを付けている
const PageTitle = ({ path }) => {
    const { t, language } = useI18n();

    useEffect(() => {
        const name = pageTitles[path]?.[language.code];
        if (path !== "/" && !name) return;
        document.title = path === "/" ? t("common.siteName") : `${name} | ${t("common.titleSuffix")}`;
    }, [path, language, t]);

    return null;
};

export default PageTitle;
