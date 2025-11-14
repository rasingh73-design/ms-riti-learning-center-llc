import { createAssignment } from "../assignments.js";

document.getElementById("addAssignmentBtn")?.addEventListener("click", async () => {
  await createAssignment({
    title:   document.getElementById("aTitle").value.trim(),
    grade:   document.getElementById("aGrade").value,
    subject: document.getElementById("aSubject").value,
    due:     document.getElementById("aDue").value.trim(),
    link:    document.getElementById("aLink").value.trim()
  });
  alert("Assignment added");
});
