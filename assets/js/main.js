
window.SS = {};
SS.SUBJECTS = {
  "English Language Arts": ["Reading","Writing","Speaking & Listening","Foundational Skills","Vocabulary"],
  "Mathematics": ["Number Sense","Operations & Algebraic Thinking","Fractions/Decimals","Measurement & Data","Geometry"],
  "Science": ["Nature of Science","Earth & Space","Physical Science","Life Science"],
  "Social Studies": ["Civics (7th)","Geography","World History (6th)","U.S. History (8th)","Economics"],
  "Computer Science & Technology": ["Digital Citizenship","Typing","Coding Basics","Productivity Tools"],
  "Health & Physical Education": ["Personal Health","PE Skills","Safety"],
  "Fine Arts – Music": ["Rhythm","Melody","Performance"],
  "Fine Arts – Visual Arts": ["Elements of Art","Creative Process","Art Appreciation"],
  "World Languages (where offered)": ["Intro Vocabulary","Listening & Speaking"],
  "Reading Intervention / ESOL": ["Phonics","Fluency","Language Development"]
};
SS.GRADES = ["PreK","K","1","2","3","4","5","6","7","8"];
SS.mountGrade = (id, anyOpt=true)=>{const el=document.getElementById(id);if(!el)return;el.innerHTML=(anyOpt?'<option value="">All Grades</option>':'')+SS.GRADES.map(g=>`<option>${g}</option>`).join('');};
SS.mountSubject = (id, anyOpt=true)=>{const el=document.getElementById(id);if(!el)return;el.innerHTML=(anyOpt?'<option value="">All Subjects</option>':'')+Object.keys(SS.SUBJECTS).map(s=>`<option>${s}</option>`).join('');};
document.addEventListener("DOMContentLoaded",()=>{const y=document.getElementById("year");if(y)y.textContent=new Date().getFullYear();const loginLink=document.getElementById('loginLink');if(loginLink){loginLink.addEventListener('click',e=>{if(window.auth && auth.currentUser){e.preventDefault();auth.signOut();}})}});
