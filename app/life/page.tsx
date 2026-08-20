import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life",
};

const items = [
  ["Travel", "Places I have been, places I want to go, and small memories worth keeping."],
  ["Music", "Albums, artists, guitars, and sounds I keep coming back to."],
  ["Photography", "A visual record of ordinary places, trips, streets, and changing light."],
  ["Books", "Things I am reading, finished recently, or want to remember."],
];

export default function LifePage() {
  return (
    <div className="editorial-page">
      <header className="editorial-hero">
        <p className="eyebrow">Life</p>
        <h1>Outside work.</h1>
        <p className="page-intro">
          A place for travel, music, photography, books, and other parts of life that do not need to become projects.
        </p>
      </header>

      <section className="editorial-panel" aria-label="Life notes">
        <div className="index-list">
          {items.map(([title, description], index) => (
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
