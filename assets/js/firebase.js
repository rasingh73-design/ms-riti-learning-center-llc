
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();
window.storage = firebase.storage();
window.auth = firebase.auth();
auth.onAuthStateChanged(user => {
  const loginLink = document.getElementById('loginLink');
  if(loginLink){ loginLink.textContent = user ? 'Logout' : 'Login'; }
  if(user && window.location.pathname.endsWith('login.html')){ window.location.href='index.html'; }
});
