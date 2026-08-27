"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  addNote,
  updateLead,
  type LeadPriority,
  type LeadStatus,
} from "@/lib/admin-api";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

/**
 * Server actions are their own entry point: middleware protects page loads, not
 * POSTs to an action id, so every mutation re-checks the session itself.
 */
const requireSession = async () => {
  const store = await cookies();
  if (!(await verifySession(store.get(SESSION_COOKIE)?.value))) {
    throw new Error("Not authenticated");
  }
};

export async function setStatus(id: string, status: LeadStatus) {
  await requireSession();
  await updateLead(id, { status });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}

export async function setPriority(id: string, priority: LeadPriority) {
  await requireSession();
  await updateLead(id, { priority });
  revalidatePath(`/admin/leads/${id}`);
  revalidatePath("/admin/leads");
}

export interface NoteState {
  error?: string;
  ok?: boolean;
}

export async function createNote(
  _prev: NoteState,
  formData: FormData
): Promise<NoteState> {
  await requireSession();

  const id = String(formData.get("id") ?? "");
  const body = String(formData.get("body") ?? "").trim();

  if (!id) return { error: "Missing lead." };
  if (body.length < 1) return { error: "Note cannot be empty." };
  if (body.length > 5000) return { error: "Note is too long (max 5000)." };

  try {
    await addNote(id, body);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not save note." };
  }

  revalidatePath(`/admin/leads/${id}`);
  return { ok: true };
}
