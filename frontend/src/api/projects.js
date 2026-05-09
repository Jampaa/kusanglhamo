import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

const PROJECTS_COLLECTION = "projects";

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

function mapProjectDoc(snapshot) {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    ...data,
    software: Array.isArray(data.software) ? data.software : [],
    extraDetails: Array.isArray(data.extraDetails) ? data.extraDetails : [],
    object3dUrl: data.object3dUrl || "",
    status: data.status || "published",
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

function sortByUpdatedDesc(a, b) {
  return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
}

function normalizeProjectPayload(payload) {
  return {
    ...payload,
    software: Array.isArray(payload.software) ? payload.software : [],
    extraDetails: Array.isArray(payload.extraDetails) ? payload.extraDetails : [],
    object3dUrl: payload.object3dUrl || "",
    status: payload.status || "published",
  };
}

export async function getPublishedProjects() {
  const projectsQuery = query(collection(db, PROJECTS_COLLECTION), where("status", "==", "published"));
  const snapshots = await getDocs(projectsQuery);
  return snapshots.docs.map(mapProjectDoc).sort(sortByUpdatedDesc);
}

export async function getProjectById(projectId) {
  const snapshot = await getDoc(doc(db, PROJECTS_COLLECTION, projectId));
  if (!snapshot.exists()) {
    throw new Error("Project not found");
  }
  const project = mapProjectDoc(snapshot);
  if (project.status !== "published") {
    throw new Error("Project not found");
  }
  return project;
}

export async function getAdminProjects() {
  const snapshots = await getDocs(collection(db, PROJECTS_COLLECTION));
  return snapshots.docs.map(mapProjectDoc).sort(sortByUpdatedDesc);
}

export async function createProject(payload) {
  const now = serverTimestamp();
  const data = normalizeProjectPayload(payload);
  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  const created = await getDoc(doc(db, PROJECTS_COLLECTION, docRef.id));
  return mapProjectDoc(created);
}

export async function updateProject(projectId, payload) {
  const docRef = doc(db, PROJECTS_COLLECTION, projectId);
  await updateDoc(docRef, {
    ...normalizeProjectPayload(payload),
    updatedAt: serverTimestamp(),
  });
  const updated = await getDoc(docRef);
  if (!updated.exists()) {
    throw new Error("Project not found");
  }
  return mapProjectDoc(updated);
}

export async function deleteProject(projectId) {
  await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
}
