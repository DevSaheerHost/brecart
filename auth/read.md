<!DOCTYPE html>
<html>
<head>
  <title>Firebase Login</title>
</head>
<body>
  <h2>Login</h2>
  <input type="email" id="email" placeholder="Email" /><br />
  <input type="password" id="password" placeholder="Password" /><br />
  <button onclick="signup()">Sign Up</button>
  <button onclick="login()">Login</button>
  <button onclick="logout()">Logout</button>

  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>

  <script>
    // 🔧 Your Firebase config here (from Firebase Console)
    const firebaseConfig = {
      apiKey: "AIza....",
      authDomain: "your-app.firebaseapp.com",
      projectId: "your-app-id",
      appId: "1:xxxx:web:xxxx"
    };

    // 🔌 Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // 🧑‍💻 SignUp function
    function signup() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          alert("Signed up as: " + userCredential.user.email);
        })
        .catch(error => alert(error.message));
    }

    // 🔑 Login function
    function login() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          alert("Logged in as: " + userCredential.user.email);
        })
        .catch(error => alert(error.message));
    }

    // 🚪 Logout function
    function logout() {
      auth.signOut().then(() => {
        alert("Signed out");
      });
    }

    // 📡 Monitor auth state
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("Logged in:", user.email);
      } else {
        console.log("Logged out");
      }
    });
  </script>
</body>
</html>



<!-- Firebase core -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "AIza....", // 👉 Copy this from your Firebase console
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    appId: "1:xxxx:web:xxxxxx",
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
</script>