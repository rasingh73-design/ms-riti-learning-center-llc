# Sunshine Scholars (Pro)

A professional K–8 teacher–student portal for Florida public schools, ready for **GitHub Pages** and **Firebase** (Auth, Firestore, Storage).

## Features
- Login (Google + Email/Password via Firebase Auth)
- Homework list (by grade & subject) — teacher creates, students view
- Homework submissions with file uploads (Firebase Storage)
- Practice page with quiz engine (JSON-driven) + result saving
- Teacher dashboard to create assignments and review submissions
- Stories page placeholder
- Responsive, clean design with Florida-inspired colors

## 1) Firebase Setup
1. Go to https://console.firebase.google.com
2. Create a project → Web App → copy the web SDK config.
3. Enable **Authentication** (Email/Password and/or Google).
4. Create **Firestore** in production mode (or test, but update rules).
5. Create **Storage**.

### Add your config
Edit `assets/js/firebase.js` and replace the placeholders:
```js
const firebaseConfig = { apiKey: "...", authDomain: "...", projectId: "...", storageBucket: "...", messagingSenderId: "...", appId: "..." };
```

### Suggested Firestore rules (starter)
> Tighten for production; this keeps student writes limited to their own docs.
```
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Allow reading assignments for everyone
    match /assignments/{id} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "teacher";
    }

    // Students can write their own submissions; teachers can read all
    match /submissions/{id} {
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow read: if request.auth != null;
      allow update, delete: if false; // tighten as needed
    }

    // Teacher designation (set once by admin)
    match /users/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false; // set via admin
    }

    // Practice results (students can write their own)
    match /practiceResults/{id} {
      allow create: if request.auth != null;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "teacher";
    }
  }
}
```

### Suggested Storage rules (starter)
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /submissions/{uid}/{allPaths=**} {
      allow write: if request.auth != null && request.auth.uid == uid;
      allow read: if false; // teachers can view via links; tighten with token-based access if needed
    }
  }
}
```

### Mark teacher accounts
Create a document `users/{uid}` with `{ role: "teacher" }` for teacher accounts.

## 2) GitHub Pages Deployment
1. Create a repo on GitHub called `sunshine-scholars`.
2. Push all files to the `main` branch.
3. Go to **Settings → Pages** and set Source to **GitHub Actions** (workflow file is provided).
4. On next push to `main`, your site will deploy to `https://<your-username>.github.io/sunshine-scholars/`.

## 3) Customize
- Colors & typography: `assets/css/style.css`
- Subjects/grades: `assets/js/main.js`
- Quizzes: add files like `data/quizzes/grade-4.json`
- Logo: `assets/img/logo.svg`

## 4) Roadmap ideas
- Per-grade pages with curated IXL links
- CSV import for assignments
- Teacher-only “gradebook” view
- Parent/guardian guest links
- Accessibility & localization improvements

---
Built on: 2025-11-14
