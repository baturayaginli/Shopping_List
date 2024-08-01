// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCDXIyvYPknlbvcCTU_xaJpQgZB-itO1Bk",
    authDomain: "shopping-list-b750e.firebaseapp.com",
    projectId: "shopping-list-b750e",
    storageBucket: "shopping-list-b750e.appspot.com",
    messagingSenderId: "950788819154",
    appId: "1:950788819154:web:ccbbd6aaf1f4ebfe77450b",
    databaseURL: "https://shopping-list-b750e-default-rtdb.firebaseio.com/"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
  
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const loginButton = document.getElementById("loginButton");
  const signUpButton = document.getElementById("signUpButton");
  
  loginButton.addEventListener("click", () => {
    const emailValue = email.value;
    const passwordValue = password.value;
  
    auth.signInWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
        window.location.href = "shopping-list.html"; // Redirect to the shopping list page
      })
      .catch(error => alert(error.message));
  });
  
  signUpButton.addEventListener("click", () => {
    const emailValue = email.value;
    const passwordValue = password.value;
  
    auth.createUserWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
        window.location.href = "shopping-list.html"; // Redirect to the shopping list page
      })
      .catch(error => alert(error.message));
  });
  