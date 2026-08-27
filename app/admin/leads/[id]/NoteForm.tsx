"use client";

import { useActionState, useEffect, useRef } from "react";
import { createNote, type NoteState } from "../actions";

export default function NoteForm({ id }: { id: string }) {
  const [state, action, pending] = useActionState<NoteState, FormData>(
    createNote,
    {}
  );
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) form.current?.reset();
  }, [state.ok]);

  return (
    <form ref={form} action={action} className="flex flex-col gap-2">
      <input type="hidden" name="id" value={id} />
      <label className="sr-only" htmlFor="note-body">
        Note
      </label>
      <textarea
        id="note-body"
        name="body"
        rows={3}
        required
        maxLength={5000}
        placeholder="Add a note..."
        className="border-2 border-border-strong bg-surface px-3 py-2 text-sm text-text focus:border-accent focus:outline-none"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="border-2 border-accent bg-accent px-4 py-2 text-sm font-medium text-text-inverse transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Saving..." : "Add note"}
        </button>
        <span role="status" aria-live="polite" className="text-xs">
          {state.error && <span className="text-neon-red">{state.error}</span>}
        </span>
      </div>
    </form>
  );
}
