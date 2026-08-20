import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
};

const sections = [
  ["Education", "Degrees, institutions, and academic training."],
  ["Experience", "Research positions, collaborations, and selected responsibilities."],
  ["Publications", "Peer reviewed papers and other research outputs."],
  ["Awards and service", "Awards, reviewing, conferences, and academic service."],
];

export default function CVPage() {
  return (
    <>
      <header className="page-header">
        <p className="eyebrow">CV</p>
        <h1>Curriculum vitae.</h1>
        <p className="page-intro">
          A concise web version of my CV. A downloadable PDF can be added here later.
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
