import Link from "next/link";

const sections = [
  {
    href: "/life",
    title: "Life",
    description: "Travel, music, photography, books, and the things I enjoy outside work.",
  },
  {
    href: "/thoughts",
    title: "Thoughts",
    description: "Notes on research, policy, cities, technology, and things I am still figuring out.",
  },
  {
    href: "/work",
    title: "Work",
    description: "Research on air quality, net zero, buildings, environmental data, and policy evaluation.",
  },
  {
    href: "/cv",
    title: "CV",
    description: "Education, research experience, publications, awards, and other professional details.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Personal website</p>
        <h1>Juncheng Qian</h1>
        <p className="hero-copy">
          Environmental researcher interested in air quality, climate policy, buildings, and data.
          This is a quiet place for my work, thoughts, and life outside research.
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="section-label">Explore</span>
          <h2>A simple home for the things I work on and care about.</h2>
        </div>

        <div className="link-list">
          {sections.map((section) => (
            <Link className="link-row" href={section.href} key={section.href}>
              <strong>{section.title}</strong>
              <span>{section.description}</span>
              <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
