import { emailLogin, emailSignup, googleLogin, logout, onUserChanged } from "../auth.js";

document.getElementById("loginBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const pass  = document.getElementById("password").value.trim();
  await emailLogin(email, pass);
  alert("Logged in!");
});

document.getElementById("signupBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const pass  = document.getElementById("password").value.trim();
  const name  = document.getElementById("name")?.value || "";
  await emailSignup(email, pass, { name });
  alert("Account created!");
});

document.getElementById("googleBtn")?.addEventListener("click", googleLogin);
document.getElementById("logoutBtn")?.addEventListener("click", logout);

onUserChanged(user => {
  const who = document.getElementById("whoami");
  if (who) who.textContent = user ? user.email : "Signed out";
});
