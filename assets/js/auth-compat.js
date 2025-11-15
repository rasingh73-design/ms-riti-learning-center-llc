// assets/js/auth-compat.js
console.log('auth-compat.js loaded');

function getAuth() {
  return window.auth || (window.firebase && window.firebase.auth && firebase.auth()) || null;
}
function getDb() {
  return window.db || (window.firebase && window.firebase.firestore && firebase.firestore()) || null;
}

window.AUTH = {
  async emailSignup(email, password, extra = {}) {
    const a = getAuth(), d = getDb();
    if (!a || !d) throw new Error('Auth/DB not initialized. Check assets/js/firebase.js and script order.');
    const cred = await a.createUserWithEmailAndPassword(email, password);
    await d.collection("users").doc(cred.user.uid).set({
      role: "student",
      name: extra.name || "",
      grade: extra.grade || "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    return cred.user;
  },

  async emailLogin(email, password) {
    const a = getAuth();
    if (!a) throw new Error('Auth not initialized.');
    const cred = await a.signInWithEmailAndPassword(email, password);
    return cred.user;
  },

  async googleLogin() {
    const a = getAuth();
    if (!a) throw new Error('Auth not initialized.');
    const provider = new firebase.auth.GoogleAuthProvider();
    return a.signInWithPopup(provider);
  },

  logout() {
    const a = getAuth();
    if (!a) throw new Error('Auth not initialized.');
    return a.signOut();
  },

  onUserChanged(cb) {
    const a = getAuth();
    if (!a) throw new Error('Auth not initialized.');
    return a.onAuthStateChanged(cb);
  }
};
