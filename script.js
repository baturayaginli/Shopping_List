// Firebase konfigürasyonu
var firebaseConfig = {
    apiKey: "AIzaSyCDXIyvYPknlbvcCTU_xaJpQgZB-itO1Bk",
    authDomain: "shopping-list-b750e.firebaseapp.com",
    databaseURL: "https://shopping-list-b750e.firebaseio.com", // URL'yi kontrol edin
    projectId: "shopping-list-b750e",
    storageBucket: "shopping-list-b750e.appspot.com",
    messagingSenderId: "950788819154",
    appId: "1:950788819154:web:ccbbd6aaf1f4ebfe77450b",
    measurementId: "G-HQ94RYMY53"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Firebase Auth ve Database referansları
const auth = firebase.auth();
const database = firebase.database();

// DOM elementlerini seçme
const taskInput = document.getElementById('taskInput');
const taskQuantityInput = document.getElementById('taskQuantity');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const logoutButton = document.getElementById('logoutButton');
const authSection = document.getElementById('authSection');
const taskSection = document.getElementById('taskSection');

// Modal elemanları
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const span = document.getElementsByClassName("close")[0];

// Kullanıcı oturum açtığında veya kapattığında yapılacak işlemler
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User logged in:", user);
        authSection.style.display = 'none';
        taskSection.style.display = 'block';
        loadTasks(user.uid);
    } else {
        console.log("User logged out");
        taskList.innerHTML = '';
        authSection.style.display = 'block';
        taskSection.style.display = 'none';
    }
});

// Görev ekleme fonksiyonu
function addTask() {
    const task = taskInput.value.trim();
    const quantity = parseInt(taskQuantityInput.value.trim(), 10);

    if (task !== '' && quantity > 0) {
        const userId = auth.currentUser.uid;
        const taskRef = database.ref('users/' + userId + '/tasks').push();
        taskRef.set({
            name: task,
            quantity: quantity
        });

        taskInput.value = '';
        taskQuantityInput.value = '';
    }
}

// Görevleri DOM'a ekleme fonksiyonu
function addTaskToDOM(taskObj, taskId) {
    const li = document.createElement('li');
    const quantityText = `${taskObj.quantity} adet`;
    li.textContent = `${taskObj.name} (${quantityText})`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
        const userId = auth.currentUser.uid;
        database.ref('users/' + userId + '/tasks/' + taskId).remove();
        taskList.removeChild(li);
    });

    li.appendChild(removeButton);
    taskList.appendChild(li);
}

// Firebase veritabanından görevleri yükleme fonksiyonu
function loadTasks(userId) {
    const tasksRef = database.ref('users/' + userId + '/tasks');
    tasksRef.on('child_added', snapshot => {
        addTaskToDOM(snapshot.val(), snapshot.key);
    });

    tasksRef.on('child_removed', snapshot => {
        const taskElement = document.getElementById(snapshot.key);
        if (taskElement) {
            taskElement.remove();
        }
    });
}

// Hata mesajı gösterme fonksiyonu
function showError(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
}

// Kullanıcı kayıt olma fonksiyonu
signupButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    if (email && password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Kayıt başarılı
            })
            .catch(error => {
                console.error('Sign Up Error:', error);
                switch (error.code) {
                    case 'auth/invalid-email':
                        showError('Invalid email format.');
                        break;
                    case 'auth/email-already-in-use':
                        showError('This email is already in use.');
                        break;
                    case 'auth/weak-password':
                        showError('Password is too weak.');
                        break;
                    case 'auth/operation-not-allowed':
                        showError('Operation not allowed.');
                        break;
                    default:
                        showError('An unknown error occurred.');
                        break;
                }
            });
    } else {
        alert('Please fill out all fields.');
    }
});

// Kullanıcı giriş yapma fonksiyonu
loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            console.error('Login Error:', error);
            switch (error.code) {
                case 'auth/invalid-email':
                    showError('Invalid email format.');
                    break;
                case 'auth/user-disabled':
                    showError('User account is disabled.');
                    break;
                case 'auth/user-not-found':
                    showError('No user found with this email.');
                    break;
                case 'auth/wrong-password':
                    showError('Incorrect password.');
                    break;
                default:
                    showError('An unknown error occurred.');
                    break;
            }
        });
});

// Kullanıcı çıkış yapma fonksiyonu
logoutButton.addEventListener('click', () => {
    auth.signOut();
});

// Enter tuşuna basıldığında görev ekleme
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskQuantityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

addTaskButton.addEventListener('click', addTask);

// Modal kapatma işlemi
span.onclick = function() {
    modal.style.display = "none";
}

// Kullanıcı modal dışına tıkladığında kapat
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
