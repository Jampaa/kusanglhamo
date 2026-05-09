import { doc, getDoc, runTransaction } from "firebase/firestore";

import { db } from "@/lib/firebase";

const viewsRef = doc(db, "analytics", "portfolio_views");

export async function getPortfolioViews() {
  const snapshot = await getDoc(viewsRef);
  if (!snapshot.exists()) {
    return 0;
  }
  return Number(snapshot.data()?.count || 0);
}

export async function incrementPortfolioViews() {
  const count = await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(viewsRef);
    const currentCount = Number(snapshot.data()?.count || 0);
    const nextCount = currentCount + 1;
    transaction.set(viewsRef, { count: nextCount }, { merge: true });
    return nextCount;
  });
  return count;
}
