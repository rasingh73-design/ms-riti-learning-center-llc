import { storage, db, auth } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function submitHomework({ title, grade, subject, file, link }) {
  if (!auth.currentUser) throw new Error("Login required");

  let fileUrl = "";
  if (file) {
    const path = `submissions/${auth.currentUser.uid}/${Date.now()}_${file.name}`;
    const sref = ref(storage, path);
    await uploadBytes(sref, file);
    fileUrl = await getDownloadURL(sref);
  }

  await addDoc(collection(db, "submissions"), {
    uid: auth.currentUser.uid,
    title, grade, subject,
    url: fileUrl,
    link: link || "",
    createdAt: serverTimestamp()
  });
}
