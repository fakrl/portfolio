const { initializeApp } = require('firebase/app');
const { getDatabase, ref, push } = require('firebase/database');
const fs = require('fs');

const firebaseConfig = {
  apiKey: "AIzaSyDhJLaWGZs1YILiMaNIDQ3mapnBUoH9R6s",
  authDomain: "fakrul-feeeb.firebaseapp.com",
  databaseURL: "https://fakrul-feeeb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fakrul-feeeb",
  storageBucket: "fakrul-feeeb.firebasestorage.app",
  messagingSenderId: "767578062305",
  appId: "1:767578062305:web:3cdf7bd8678923bb3e26a0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const photos = JSON.parse(fs.readFileSync('moments-data.json', 'utf8'));

async function seedAll() {
  const photosRef = ref(db, 'photos');
  let count = 0;

  for (const photo of photos) {
    await push(photosRef, photo);
    count++;
    console.log(`✅ ${count}/${photos.length} — ${photo.filename}`);
  }

  console.log('\nDone! All photos seeded to Firebase.');
  process.exit(0);
}

seedAll();