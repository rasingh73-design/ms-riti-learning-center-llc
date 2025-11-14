
window.HW = {};
HW.addAssignment = async (data)=>{ await db.collection('assignments').add({...data, createdAt: firebase.firestore.FieldValue.serverTimestamp()}); };
HW.listAssignments = async ({grade,subject})=>{
  let q = db.collection('assignments').orderBy('createdAt','desc').limit(100);
  if(grade){ q = q.where('grade','==',grade); }
  if(subject){ q = q.where('subject','==',subject); }
  const snap = await q.get(); return snap.docs.map(d=>({id:d.id,...d.data()}));
};
HW.renderList = async (containerId, gradeSelId, subjectSelId)=>{
  const el=document.getElementById(containerId); if(!el)return;
  const g=(document.getElementById(gradeSelId)?.value||'').trim();
  const s=(document.getElementById(subjectSelId)?.value||'').trim();
  const items=await HW.listAssignments({grade:g||null,subject:s||null});
  if(items.length===0){el.innerHTML='<div class="small">No homework yet.</div>';return;}
  el.innerHTML = items.map(h=>`
    <div class="row">
      <div><div class="subject">${h.title}</div><div class="small">${h.subject||''} · Grade ${h.grade||''}</div></div>
      <div class="small">Due: ${h.due||''}</div>
      ${h.link?`<a class="btn btn-ghost" href="${h.link}" target="_blank">Open</a>`:''}
    </div>`).join('');
};
