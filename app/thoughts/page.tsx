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
    <div className="editorial-page">
      <header className="editorial-hero">
        <p className="eyebrow">Thoughts</p>
        <h1>Notes, not a blog.</h1>
        <p className="page-intro">
          A flexible space for ideas that are useful enough to keep, but do not need to become formal papers.
        </p>
      </header>

      <section className="editorial-panel" aria-label="Thought topics">
        <div className="index-list">
          {topics.map(([title, description], index) => (
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
