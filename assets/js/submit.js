
window.SUBMIT = {};
SUBMIT.upload = async ({file, meta})=>{
  const user = auth.currentUser; if(!user) throw new Error('Login required');
  const path = `submissions/${user.uid}/${Date.now()}_${file.name}`;
  const ref = storage.ref().child(path); await ref.put(file);
  const url = await ref.getDownloadURL();
  await db.collection('submissions').add({uid:user.uid, url, ...meta, createdAt: firebase.firestore.FieldValue.serverTimestamp()});
  return url;
};
