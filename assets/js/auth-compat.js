// assets/js/auth-compat.js
// uses window.auth/db from assets/js/firebase.js (compat SDK)

window.AUTH = {
  async emailSignup(email, password, extra = {}) {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection("users").doc(cred.user.uid).set({
      role: "student",
      name: extra.name || "",
      grade: extra.grade || "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    return cred.user;
  },

  async emailLogin(email, password) {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    return cred.user;
  },

  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
  },

  logout() { return auth.signOut(); },

  onUserChanged(cb) { return auth.onAuthStateChanged(cb); }
};
