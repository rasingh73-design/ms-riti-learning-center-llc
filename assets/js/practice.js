
window.PRACTICE = {};
PRACTICE.loadQuiz = async (grade)=>{ const res = await fetch(`data/quizzes/grade-${grade}.json`).catch(()=>null); if(!res||!res.ok) return null; return await res.json(); };
PRACTICE.renderQuiz = async (containerId, grade)=>{
  const el=document.getElementById(containerId); if(!el)return;
  const quiz=await PRACTICE.loadQuiz(grade);
  if(!quiz){el.innerHTML='<div class="small">No quiz yet for this grade.</div>';return;}
  let html=''; quiz.questions.forEach((q,i)=>{ html += `<div class="card" style="margin-bottom:.6rem">
    <div class="small">Q${i+1}. ${q.prompt}</div><div style="margin-top:.4rem">
      ${q.choices.map((c,idx)=>`<label style="display:block;margin:.2rem 0"><input type="radio" name="q${i}" value="${idx}"/> ${c}</label>`).join('')}
    </div></div>`; });
  html+=`<button class="btn btn-primary" onclick="PRACTICE.grade('${containerId}', ${quiz.questions.length})">Submit Answers</button>`;
  el.innerHTML=html;
};
PRACTICE.grade = async (containerId,count)=>{
  const el=document.getElementById(containerId);
  const gradeSel=document.getElementById('gradeSelectPractice');
  const quiz=await PRACTICE.loadQuiz(gradeSel.value);
  let correct=0; quiz.questions.forEach((q,i)=>{ const picked=el.querySelector(`input[name=q${i}]:checked`); if(picked && parseInt(picked.value)===q.answer) correct++; });
  const user=auth.currentUser;
  await db.collection('practiceResults').add({uid:user?user.uid:null, grade:gradeSel.value, correct, total:quiz.questions.length, createdAt: firebase.firestore.FieldValue.serverTimestamp()});
  alert(`You scored ${correct} / ${quiz.questions.length}`);
};
