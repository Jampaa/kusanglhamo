import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";

import { db } from "@/lib/firebase";

const CONTACT_COLLECTION = "contact_messages";

function toIso(value) {
  if (!value) {
    return "";
  }
  if (typeof value?.toDate === "function") {
    return value.toDate().toISOString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return String(value);
}

function mapMessageDoc(snapshot) {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    name: data.name || "",
    email: data.email || "",
    message: data.message || "",
    createdAt: toIso(data.createdAt),
  };
}

export async function submitContactMessage(payload) {
  const normalized = {
    name: (payload.name || "").trim(),
    email: (payload.email || "").trim().toLowerCase(),
    message: (payload.message || "").trim(),
    createdAt: serverTimestamp(),
  };
  await addDoc(collection(db, CONTACT_COLLECTION), normalized);
}

export async function getAdminMessages() {
  const snapshots = await getDocs(collection(db, CONTACT_COLLECTION));
  return snapshots.docs
    .map(mapMessageDoc)
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}
