"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";

export default function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {}
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="font-data text-[0.65rem] tracking-[0.16em] text-text-muted uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="border-2 border-border-strong bg-surface px-3 py-2.5 text-text transition-colors focus:border-accent focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="border-2 border-accent bg-accent px-4 py-2.5 font-medium text-text-inverse transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Checking..." : "Sign in"}
      </button>

      <p role="status" aria-live="polite" className="min-h-5 text-sm text-neon-red">
        {state.error}
      </p>
    </form>
  );
}
