// ✅ All imports at the top
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCsTD5XSRNl7VG-i6Ir0F3D1X1PxWk2Rfs",
  authDomain: "shopify-30670.firebaseapp.com",
  databaseURL: "https://shopify-30670-default-rtdb.firebaseio.com",
  projectId: "shopify-30670",
  storageBucket: "shopify-30670.appspot.com",
  messagingSenderId: "792157900529",
  appId: "1:792157900529:web:32d02d2d8b3fe05d94e350",
  measurementId: "G-MZC38NN5BZ",
};

// ✅ Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Auth & Database using the same `app`
const auth = getAuth(app);
const db = getDatabase(app);

const $ = selector => document.querySelector(selector)

$('#signup').onclick = async () => {
  const signupDataFields = ['#name', '#email', '#password'];
  let hasEmpty = false;
  
  const data = {};
  signupDataFields.forEach(sel => {
    const el = $(`.signup ${sel}`);
    const key = sel.replace('#', '');
    const value = el.value.trim();
    if (value === '') {
      el.classList.add('error');
      el.focus();
      hasEmpty = true;
    } else {
      el.classList.remove('error');
      data[key] = value;
    }
    
    el.oninput = () => el.classList.remove('error');
  });
  
  if (hasEmpty) return;
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;
    
    await set(ref(db, 'users/' + user.uid), {
      name: data.name,
      email: data.email,
      createdAt: new Date().toISOString()
    });
    
    alert('Signup successful ✅');
    
  } catch (error) {
    alert(`Signup Failed: ${error.message}`);
  }
};




$('#signin').onclick = async () => {
  const signinDataFields = ['#email1', '#password1'];
  let hasEmpty = false;
  
  const data = {};
  signinDataFields.forEach(sel => {
    const el = $(`.signin ${sel}`);
    const key = sel.replace('#', '');
    const value = el.value.trim();
    if (value === '') {
      el.classList.add('error');
      el.focus();
      hasEmpty = true;
    } else {
      el.classList.remove('error');
      data[key] = value;
    }
    
    el.oninput = () => el.classList.remove('error');
  });
  
  if (hasEmpty) return;
  
  try {
    // Firebase Auth Sign-in
    const userCredential = await signInWithEmailAndPassword(auth, data.email1, data.password1);
    const user = userCredential.user;
    
    //alert(`Welcome back, ${user.email} ✅`);
    window.location='../'
    // Redirect or load user dashboard here
    
  } catch (error) {
    alert(`Login failed ❌: ${error.message}`);
  }
};

$("#openLogin").onclick = () => {
  $(".login").classList.add("open");
  $(".signup").classList.remove("open");
};

$("#openSignup").onclick = () => {
  $(".signup").classList.add("open");
  $(".login").classList.remove("open");
};

