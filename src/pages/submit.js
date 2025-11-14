import { submitHomework } from "../submissions.js";

document.getElementById("submitBtn")?.addEventListener("click", async () => {
  const file = document.getElementById("file").files[0];
  await submitHomework({
    title:   document.getElementById("title").value.trim(),
    grade:   document.getElementById("grade").value,
    subject: document.getElementById("subject").value,
    link:    document.getElementById("link").value.trim(),
    file
  });
  alert("Submitted!");
  (document.getElementById("file").value = "");
});
