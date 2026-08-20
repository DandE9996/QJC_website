import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
};

const sections = [
  ["Research", "The questions and themes that connect my current research."],
  ["Projects", "Selected projects, with space for the problem, data, methods, and main findings."],
  ["Publications", "Published work, manuscripts, reports, and other research outputs."],
];

export default function WorkPage() {
  return (
    <div className="editorial-page">
      <header className="editorial-hero">
        <p className="eyebrow">Work</p>
        <h1>Research and projects.</h1>
        <p className="page-intro">
          This section holds the professional side of the site without turning the whole website into an online résumé.
        </p>
      </header>

      <section className="editorial-panel" aria-label="Work sections">
        <div className="index-list">
          {sections.map(([title, description], index) => (
            <article className="index-row" key={title}>
              <span className="index-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
