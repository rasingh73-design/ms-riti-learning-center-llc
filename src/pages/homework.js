import { listAssignments } from "../assignments.js";

async function render() {
  const grade = document.getElementById("gradeSel")?.value || "";
  const subject = document.getElementById("subjectSel")?.value || "";
  const rows = await listAssignments({ grade, subject });

  const root = document.getElementById("hwList");
  root.innerHTML = rows.length
    ? rows.map(r => `
        <div class="row">
          <div>
            <div class="subject">${r.title}</div>
            <div class="small">${r.subject || ""} · Grade ${r.grade || ""}</div>
          </div>
          ${r.due ? `<div class="small">Due: ${r.due}</div>` : ""}
          ${r.link ? `<a class="btn btn-ghost" target="_blank" href="${r.link}">Open</a>` : ""}
        </div>
      `).join("")
    : `<div class="small">No homework yet.</div>`;
}

document.getElementById("filterBtn")?.addEventListener("click", render);
document.getElementById("resetBtn")?.addEventListener("click", () => {
  if (document.getElementById("gradeSel"))   document.getElementById("gradeSel").value = "";
  if (document.getElementById("subjectSel")) document.getElementById("subjectSel").value = "";
  render();
});

render();
