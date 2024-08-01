document.addEventListener('DOMContentLoaded', function () {
    const addItemButton = document.getElementById('add-item-button');
    const itemInput = document.getElementById('item-input');
    const quantityInput = document.getElementById('quantity-input');
    const itemList = document.getElementById('item-list');
    const logoutButton = document.getElementById('logout-button');

    function addItem() {
        const item = itemInput.value;
        const quantity = quantityInput.value;
        if (item && quantity) {
            const itemData = {
                item: item,
                quantity: quantity
            };
            // Add item to Firebase Realtime Database
            firebase.database().ref('items').push(itemData)
                .then(() => {
                    itemInput.value = '';
                    quantityInput.value = '';
                    console.log('Item added successfully');
                })
                .catch(error => {
                    console.error('Error adding item:', error);
                });
        } else {
            alert('Please enter both item and quantity.');
        }
    }

    addItemButton.addEventListener('click', function () {
        addItem();
    });

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

    // Fetch items from Firebase Realtime Database
    firebase.database().ref('items').on('value', function (snapshot) {
        itemList.innerHTML = '';
        snapshot.forEach(function (childSnapshot) {
            const itemData = childSnapshot.val();
            const li = document.createElement('li');
            li.textContent = `${itemData.item} (${itemData.quantity})`;
            itemList.appendChild(li);
        });
    });

    logoutButton.addEventListener('click', function () {
        firebase.auth().signOut().then(() => {
            console.log('User logged out');
        }).catch((error) => {
            console.error('Error logging out:', error);
        });
    });
});
