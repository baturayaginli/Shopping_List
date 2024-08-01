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
const db = firebase.database();

const itemInput = document.getElementById("itemInput");
const quantityInput = document.getElementById("quantityInput");
const addItemButton = document.getElementById("addItemButton");
const shoppingList = document.getElementById("shoppingList");
const logoutButton = document.getElementById("logoutButton");
const loginButton = document.getElementById("loginButton");
const signUpButton = document.getElementById("signUpButton");
const email = document.getElementById("email");
const password = document.getElementById("password");

addItemButton.addEventListener("click", () => {
  const item = itemInput.value;
  const quantity = quantityInput.value;

  if (item && quantity) {
    const userId = auth.currentUser.uid;
    db.ref('users/' + userId + '/shoppingList').push({
      item: item,
      quantity: quantity
    });

    itemInput.value = '';
    quantityInput.value = '';
  }
});

auth.onAuthStateChanged(user => {
  if (user) {
    loginButton.style.display = 'none';
    signUpButton.style.display = 'none';
    email.style.display = 'none';
    password.style.display = 'none';
    logoutButton.style.display = 'block';

    db.ref('users/' + user.uid + '/shoppingList').on('value', snapshot => {
      shoppingList.innerHTML = '';
      snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();
        shoppingList.innerHTML += `<div>${childData.item}: ${childData.quantity}</div>`;
      });
    });
  } else {
    loginButton.style.display = 'block';
    signUpButton.style.display = 'block';
    email.style.display = 'block';
    password.style.display = 'block';
    logoutButton.style.display = 'none';
    shoppingList.innerHTML = '';
  }
});

logoutButton.addEventListener("click", () => {
  auth.signOut();
});

loginButton.addEventListener("click", () => {
  const emailValue = email.value;
  const passwordValue = password.value;

  auth.signInWithEmailAndPassword(emailValue, passwordValue)
    .catch(error => alert(error.message));
});

signUpButton.addEventListener("click", () => {
  const emailValue = email.value;
  const passwordValue = password.value;

  auth.createUserWithEmailAndPassword(emailValue, passwordValue)
    .catch(error => alert(error.message));
});
