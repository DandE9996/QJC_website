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
    <>
      <header className="page-header">
        <p className="eyebrow">Work</p>
        <h1>Research and projects.</h1>
        <p className="page-intro">
          This section will hold the professional side of the site without turning the whole website into an online résumé.
        </p>
      </header>

      <section className="section">
        <div className="simple-list">
          {sections.map(([title, description]) => (
            <div className="simple-item" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
