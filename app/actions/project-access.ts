"use server"

import { hasProjectAccess } from "@/lib/auth/session"

/** Lets the homepage skip the password modal for visitors who already hold a valid session. */
export async function checkProjectAccess(): Promise<boolean> {
  return hasProjectAccess()
}
