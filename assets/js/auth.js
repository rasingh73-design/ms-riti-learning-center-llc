// src/auth.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// Email/password
export async function emailSignup(email, password, extra = {}) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  // Create user profile doc (students by default)
  await setDoc(doc(db, "users", cred.user.uid), {
    role: "student",
    name: extra.name || "",
    grade: extra.grade || "",
    createdAt: new Date()
  });
  return cred.user;
}

export async function emailLogin(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  // If first login, ensure user doc exists
  const uref = doc(db, "users", cred.user.uid);
  const snap = await getDoc(uref);
  if (!snap.exists()) {
    await setDoc(uref, { role: "student", name: cred.user.displayName || "", grade: "", createdAt: new Date() });
  }
  return cred.user;
}

export function logout() {
  return signOut(auth);
}

// Listen for changes (hook up to your UI)
export function onUserChanged(cb) {
  return onAuthStateChanged(auth, cb);
}
