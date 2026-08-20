"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./thoughts.module.css";

type ThoughtNote = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

const STORAGE_KEY = "qjc-thought-notes-v1";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function ThoughtsClient() {
  const [notes, setNotes] = useState<ThoughtNote[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ThoughtNote[];
        if (Array.isArray(parsed)) {
          setNotes(parsed);
        }
      }
    } catch {
      // A malformed local value should never prevent the page from loading.
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [loaded, notes]);

  useEffect(() => {
    if (isWriting) {
      window.setTimeout(() => bodyRef.current?.focus(), 120);
    }
  }, [isWriting]);

  const sortedNotes = useMemo(
    () => [...notes].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [notes],
  );

  function closeComposer() {
    setIsWriting(false);
    setTitle("");
    setBody("");
  }

  function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanBody = body.trim();
    const cleanTitle = title.trim();

    if (!cleanBody) return;

    setNotes((current) => [
      {
        id: makeId(),
        title: cleanTitle,
        body: cleanBody,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);

    closeComposer();
  }

  return (
    <section className={styles.workspace} aria-label="Thought notes">
      <div className={styles.toolbar}>
        <button
          className={styles.addButton}
          type="button"
          aria-expanded={isWriting}
          onClick={() => setIsWriting((current) => !current)}
        >
          <span className={styles.plus} aria-hidden="true">+</span>
          <span>Note something down</span>
        </button>
      </div>

      <div className={`${styles.composerWrap} ${isWriting ? styles.composerOpen : ""}`}>
        {isWriting && (
          <form className={styles.composer} onSubmit={addNote}>
            <input
              className={styles.titleInput}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="A title, if it needs one"
              aria-label="Note title"
              maxLength={120}
            />
            <textarea
              ref={bodyRef}
              className={styles.bodyInput}
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Write the thought while it is still fresh."
              aria-label="Note body"
              rows={8}
            />
            <div className={styles.composerActions}>
              <button className={styles.cancelButton} type="button" onClick={closeComposer}>
                Cancel
              </button>
              <button className={styles.saveButton} type="submit" disabled={!body.trim()}>
                Add note
              </button>
            </div>
          </form>
        )}
      </div>

      {loaded && sortedNotes.length > 0 && (
        <div className={styles.notesList}>
          {sortedNotes.map((note, index) => (
            <article className={styles.note} key={note.id}>
              <div className={styles.noteMeta}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time dateTime={note.createdAt}>
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(note.createdAt))}
                </time>
              </div>
              {note.title && <h2>{note.title}</h2>}
              <p>{note.body}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
