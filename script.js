<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping List</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5041542557528622" crossorigin="anonymous"></script>
</head>
<body>
    <div class="main-content">
        <h1>Shopping List</h1>
        <input type="text" id="item" placeholder="Enter an item">
        <input type="number" id="quantity" placeholder="Quantity">
        <button id="addItem">Add Item</button>
        <button id="logout">Logout</button>
        <br><br>
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <button id="login">Login</button>
        <button id="signup">Sign Up</button>
    </div>

    <script>
        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCDXIyvYPknlbvcCTU_xaJpQgZB-itO1Bk",
            authDomain: "shopping-list-b750e.firebaseapp.com",
            databaseURL: "https://shopping-list-b750e-default-rtdb.firebaseio.com/",
            projectId: "shopping-list-b750e",
            storageBucket: "shopping-list-b750e.appspot.com",
            messagingSenderId: "950788819154",
            appId: "1:950788819154:web:ccbbd6aaf1f4ebfe77450b",
            measurementId: "G-HQ94RYMY53"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        const database = firebase.database();

        document.getElementById('addItem').addEventListener('click', () => {
            const item = document.getElementById('item').value;
            const quantity = document.getElementById('quantity').value;
            const userId = firebase.auth().currentUser.uid;

            if (item && quantity) {
                firebase.database().ref('users/' + userId + '/shopping_list').push({
                    item: item,
                    quantity: quantity
                });
            }
        });

        document.getElementById('signup').addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log('User signed up: ', userCredential.user);
                })
                .catch((error) => {
                    console.error('Error signing up: ', error.message);
                });
        });

        document.getElementById('login').addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log('User logged in: ', userCredential.user);
                })
                .catch((error) => {
                    console.error('Error logging in: ', error.message);
                });
        });

        document.getElementById('logout').addEventListener('click', () => {
            firebase.auth().signOut().then(() => {
                console.log('User logged out');
            }).catch((error) => {
                console.error('Error logging out: ', error.message);
            });
        });
    </script>
</body>
</html>
