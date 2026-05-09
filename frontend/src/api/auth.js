import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";

function resolveLoginEmail(rawUsername) {
  const value = (rawUsername || "").trim();
  if (!value) {
    return "";
  }
  if (value.includes("@")) {
    return value;
  }
  const configuredAdminEmail = process.env.REACT_APP_ADMIN_EMAIL || "";
  if (configuredAdminEmail && value.toLowerCase() === configuredAdminEmail.split("@")[0].toLowerCase()) {
    return configuredAdminEmail;
  }
  return value;
}

export async function loginAdmin(credentials) {
  const email = resolveLoginEmail(credentials.username);
  const password = credentials.password;
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const result = await signInWithEmailAndPassword(auth, email, password);
  const configuredAdminEmail = (process.env.REACT_APP_ADMIN_EMAIL || "").toLowerCase();
  if (configuredAdminEmail && result.user.email?.toLowerCase() !== configuredAdminEmail) {
    await signOut(auth);
    throw new Error("This account is not authorized for admin access.");
  }
  return { username: result.user.email };
}

export async function getAdminMe() {
  if (!auth.currentUser) {
    throw new Error("Please login again.");
  }
  return { username: auth.currentUser.email };
}

export async function logoutAdmin() {
  await signOut(auth);
}

export function isAdminLoggedIn() {
  return Boolean(auth.currentUser);
}

export function subscribeAdminAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}
