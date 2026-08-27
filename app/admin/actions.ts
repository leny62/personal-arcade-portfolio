"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  checkPassword,
  cookieOptions,
  createSession,
} from "@/lib/session";

export interface LoginState {
  error?: string;
}

/** Only same-origin admin paths, so ?next= cannot be used as an open redirect. */
const safeNext = (value: string): string =>
  value.startsWith("/admin") && !value.startsWith("//") ? value : "/admin";

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? "/admin"));

  if (!(await checkPassword(password))) {
    // Costs a brute-force attempt real time. The actual defence is a long
    // random password, this just removes the cheap high-rate attack.
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { error: "Incorrect password." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, await createSession(), cookieOptions());

  // redirect() signals via a thrown value, so it must sit outside any try.
  redirect(next);
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
