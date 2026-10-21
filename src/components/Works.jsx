import React from "react";
import { Link } from "react-router-dom";
import { useI18n, useWorks } from "../i18n";

// INTRODUCTION の「出演実績」。場面ごとに、出演先と出演した年を並べる（データの作り方は src/i18n/index.js の useWorks）。
// 年は、その年の NEWS の記事があれば記事のページへのリンク

const heading = {
    borderBottom: "solid #cccccc 1px",
    fontSize: "18px",
    marginBottom: "0",
}

const note = {
    fontSize: "13px",
    color: "#757575",
    margin: "12px 0 0",
}

const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "8px 32px",
}

const sceneLabel = {
    fontSize: "15px",
    margin: "24px 0 8px",
}

const list = {
    margin: 0,
    padding: 0,
    listStyle: "none",
}

const work = {
    padding: "6px 0",
    borderBottom: "solid #eeeeee 1px",
    lineHeight: 1.7,
}

const years = {
    fontSize: "13px",
    color: "#555555",
}

const Works = () => {
    const { t, path } = useI18n();
    const groups = useWorks();
    if (groups.length === 0) return null;

    return (
        <section style={{ padding: "42px 8px 0 8px" }}>
            <h2 style={heading}>{t("works.heading")}</h2>
            <p style={note}>{t("works.note")}</p>
            <div style={grid}>
                {groups.map(({ scene, works }) => (
                    <div key={scene}>
                        <h3 style={sceneLabel}>{t(`works.scenes.${scene}`)}</h3>
                        <ul style={list}>
                            {works.map((item) => (
                                <li key={item.title} style={work}>
                                    {item.title}
                                    <br />
                                    <span style={years}>
                                        {item.years.map(({ year, slug }, i) => (
                                            <React.Fragment key={year}>
                                                {i > 0 && "・"}
                                                {slug ? <Link to={path(`/news/${slug}`)}>{year}</Link> : year}
                                            </React.Fragment>
                                        ))}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Works;
