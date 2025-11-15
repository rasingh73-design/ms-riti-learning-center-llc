import { db } from "./firebase";
import {
  collection, addDoc, query, where, getDocs, orderBy, serverTimestamp
} from "firebase/firestore";

// teacher only (rules enforce)
export async function createAssignment({ title, subject, grade, due, link }) {
  return addDoc(collection(db, "assignments"), {
    title, subject, grade,
    due: due || null,
    link: link || "",
    createdAt: serverTimestamp()
  });
}

export async function listAssignments({ grade, subject } = {}) {
  let q = query(collection(db, "assignments"), orderBy("createdAt", "desc"));
  // optional filters client-side (or add Firestore where clauses if indexed)
  const snap = await getDocs(q);
  let items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  if (grade)   items = items.filter(a => a.grade === grade);
  if (subject) items = items.filter(a => a.subject === subject);
  return items;
}
