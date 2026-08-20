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
    <>
      <header className="page-header">
        <p className="eyebrow">Life</p>
        <h1>Outside work.</h1>
        <p className="page-intro">
          A place for travel, music, photography, books, and other parts of life that do not need to become projects.
        </p>
      </header>

      <section className="section">
        <div className="simple-list">
          {items.map(([title, description]) => (
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
