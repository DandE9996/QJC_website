import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts",
};

const topics = [
  ["Research notes", "Short notes on methods, evidence, and questions that come up while doing research."],
  ["Policy", "Thoughts on how environmental policy is designed, evaluated, and translated into real outcomes."],
  ["Cities and environment", "Observations about buildings, air, infrastructure, and everyday urban life."],
  ["Technology", "Notes on data, machine learning, AI tools, and how I use them in practice."],
];

export default function ThoughtsPage() {
  return (
    <>
      <header className="page-header">
        <p className="eyebrow">Thoughts</p>
        <h1>Notes, not a blog.</h1>
        <p className="page-intro">
          A flexible space for ideas that are useful enough to keep, but do not need to become formal papers.
        </p>
      </header>

      <section className="section">
        <div className="simple-list">
          {topics.map(([title, description]) => (
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
