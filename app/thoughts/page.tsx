import type { Metadata } from "next";
import ThoughtsClient from "./thoughts-client";

export const metadata: Metadata = {
  title: "Thoughts",
};

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

      <ThoughtsClient />
    </div>
  );
}
