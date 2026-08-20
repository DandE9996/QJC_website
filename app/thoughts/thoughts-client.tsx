"use client";

import type { User } from "@supabase/supabase-js";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { qjcSupabase } from "../../lib/qjc-supabase";
import styles from "./thoughts.module.css";

type ThoughtNote = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

type DatabaseThought = {
  id: string;
  title: string | null;
  body: string;
  created_at: string;
};

type LegacyThoughtNote = {
  title?: unknown;
  body?: unknown;
  createdAt?: unknown;
};

const LEGACY_STORAGE_KEY = "qjc-thought-notes-v1";

function mapThought(note: DatabaseThought): ThoughtNote {
  return {
    id: note.id,
    title: note.title ?? "",
    body: note.body,
    createdAt: note.created_at,
  };
}

async function migrateLegacyNotes(user: User) {
  const saved = window.localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved) as LegacyThoughtNote[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return;
    }

    const { count, error: countError } = await qjcSupabase
      .from("thoughts")
      .select("id", { count: "exact", head: true });

    if (countError || (count ?? 0) > 0) return;

    const rows = parsed
      .map((note) => {
        const body = typeof note.body === "string" ? note.body.trim() : "";
        const title = typeof note.title === "string" ? note.title.trim() : "";
        const createdAt =
          typeof note.createdAt === "string" && !Number.isNaN(Date.parse(note.createdAt))
            ? note.createdAt
            : new Date().toISOString();

        if (!body) return null;

        return {
          author_id: user.id,
          title,
          body,
          status: "published",
          created_at: createdAt,
          updated_at: createdAt,
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);

    if (rows.length === 0) {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
      return;
    }

    const { error } = await qjcSupabase.from("thoughts").insert(rows);
    if (!error) {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    }
  } catch {
    // Leave malformed legacy data untouched rather than risking accidental loss.
  }
}

export default function ThoughtsClient() {
  const [notes, setNotes] = useState<ThoughtNote[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  async function loadNotes() {
    setLoadError("");

    const { data, error } = await qjcSupabase
      .from("thoughts")
      .select("id,title,body,created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      setLoadError("Thoughts could not be loaded right now.");
      setLoaded(true);
      return;
    }

    setNotes(((data ?? []) as DatabaseThought[]).map(mapThought));
    setLoaded(true);
  }

  async function applyUser(nextUser: User | null) {
    setUser(nextUser);
    setIsEditor(false);

    if (!nextUser) return;

    const { data, error } = await qjcSupabase
      .from("editors")
      .select("user_id")
      .eq("user_id", nextUser.id)
      .maybeSingle();

    if (!error && data) {
      setIsEditor(true);
      setAuthOpen(false);
      await migrateLegacyNotes(nextUser);
      await loadNotes();
    }
  }

  useEffect(() => {
    void loadNotes();

    void qjcSupabase.auth.getSession().then(({ data }) => {
      void applyUser(data.session?.user ?? null);
    });

    const {
      data: { subscription },
    } = qjcSupabase.auth.onAuthStateChange((_event, session) => {
      void applyUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  function handleNoteButton() {
    setAuthError("");

    if (isEditor) {
      setAuthOpen(false);
      setIsWriting((current) => !current);
      return;
    }

    setIsWriting(false);
    setAuthOpen((current) => !current);
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) return;

    const { data, error } = await qjcSupabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error || !data.user) {
      setAuthError("Unable to sign in with those credentials.");
      return;
    }

    const { data: editor, error: editorError } = await qjcSupabase
      .from("editors")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (editorError || !editor) {
      await qjcSupabase.auth.signOut();
      setAuthError("This account does not have QJC editor access.");
      return;
    }

    setPassword("");
    setAuthOpen(false);
    setIsWriting(true);
  }

  async function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanBody = body.trim();
    const cleanTitle = title.trim();

    if (!cleanBody || !user || !isEditor || saving) return;

    setSaving(true);
    setLoadError("");

    const { data, error } = await qjcSupabase
      .from("thoughts")
      .insert({
        author_id: user.id,
        title: cleanTitle,
        body: cleanBody,
        status: "published",
      })
      .select("id,title,body,created_at")
      .single();

    setSaving(false);

    if (error || !data) {
      setLoadError("The note could not be saved. Please try again.");
      return;
    }

    setNotes((current) => [mapThought(data as DatabaseThought), ...current]);
    closeComposer();
  }

  return (
    <section className={styles.workspace} aria-label="Thought notes">
      <div className={styles.toolbar}>
        <button
          className={styles.addButton}
          type="button"
          aria-expanded={isWriting || authOpen}
          onClick={handleNoteButton}
        >
          <span className={styles.plus} aria-hidden="true">+</span>
          <span>Note something down</span>
        </button>
      </div>

      <div className={`${styles.composerWrap} ${authOpen ? styles.composerOpen : ""}`}>
        {authOpen && (
          <form className={`${styles.composer} ${styles.authComposer}`} onSubmit={signIn}>
            <p className={styles.authLabel}>Editor access</p>
            <input
              className={styles.authInput}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              autoComplete="email"
              aria-label="Editor email"
            />
            <input
              className={styles.authInput}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              aria-label="Editor password"
            />
            {authError && <p className={styles.statusMessage}>{authError}</p>}
            <div className={styles.composerActions}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={() => {
                  setAuthOpen(false);
                  setAuthError("");
                  setPassword("");
                }}
              >
                Cancel
              </button>
              <button
                className={styles.saveButton}
                type="submit"
                disabled={!email.trim() || !password}
              >
                Sign in
              </button>
            </div>
          </form>
        )}
      </div>

      <div className={`${styles.composerWrap} ${isWriting ? styles.composerOpen : ""}`}>
        {isWriting && isEditor && (
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
              <button className={styles.saveButton} type="submit" disabled={!body.trim() || saving}>
                {saving ? "Saving..." : "Add note"}
              </button>
            </div>
          </form>
        )}
      </div>

      {loadError && <p className={styles.statusMessage}>{loadError}</p>}

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
