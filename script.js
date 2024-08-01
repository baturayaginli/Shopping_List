document.addEventListener('DOMContentLoaded', function () {
    const addItemButton = document.getElementById('add-item-button');
    const itemInput = document.getElementById('item-input');
    const quantityInput = document.getElementById('quantity-input');
    const itemList = document.getElementById('item-list');
    const logoutButton = document.getElementById('logout-button');

    // Add item to the list and Firebase
    addItemButton.addEventListener('click', function () {
        addItem();
    });

    // Add item on Enter key press
    itemInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    quantityInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    function addItem() {
        const itemName = itemInput.value.trim();
        const itemQuantity = quantityInput.value.trim();

        if (itemName && itemQuantity) {
            const itemId = firebase.database().ref().child('items').push().key;
            const itemData = {
                name: itemName,
                quantity: itemQuantity
            };
            const updates = {};
            updates['/items/' + itemId] = itemData;
            firebase.database().ref().update(updates);

            itemInput.value = '';
            quantityInput.value = '';
        }
    }

    // Logout function
    logoutButton.addEventListener('click', function () {
        firebase.auth().signOut().then(() => {
            console.log('User logged out');
            window.location.reload();
        }).catch((error) => {
            console.error('Logout Error:', error);
        });
    });

    // Fetch items from Firebase and display
    firebase.database().ref('items').on('value', function (snapshot) {
        itemList.innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
            const childData = childSnapshot.val();
            const listItem = document.createElement('li');
            listItem.textContent = `${childData.name} (${childData.quantity} adet)`;
            itemList.appendChild(listItem);
        });
    });

    // Authentication
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('User logged in:', user.email);
        } else {
            console.log('No user is signed in');
            window.location.href = 'login.html'; // Redirect to login page if not logged in
        }
    });
});
