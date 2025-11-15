import { db, auth } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function savePracticeResult({ grade, blueprintId, correct, total }) {
  await addDoc(collection(db, "practiceResults"), {
    uid: auth.currentUser ? auth.currentUser.uid : null,
    grade, blueprintId: blueprintId || null,
    correct, total,
    createdAt: serverTimestamp()
  });
}
