let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let selectedItems = {};

// Mapping button IDs to item names
const itemNames = {
    'football': 'Футбол',
    'sex': 'Секс',
    'Овсянка': 'Овсянка'
};

document.querySelectorAll('.btn.add').forEach(button => {
    button.addEventListener('click', function() {
        let itemId = this.id.replace('btn-', '');
        let itemName = itemNames[itemId];
        selectedItems[itemName] = (selectedItems[itemName] || 0) + 1;
        updateMainButton();
    });
});

document.getElementById('increase-ovsyanka').addEventListener('click', function() {
    updateQuantity('Овсянка', 100);
});

document.getElementById('decrease-ovsyanka').addEventListener('click', function() {
    updateQuantity('Овсянка', -100);
});

function updateQuantity(item, change) {
    let quantityElement = document.getElementById(`quantity-ovsyanka`);
    let quantity = parseInt(quantityElement.innerText) + change;
    if (quantity < 0) quantity = 0;
    quantityElement.innerText = quantity;
    selectedItems[item] = quantity;
    if (quantity === 0) {
        delete selectedItems[item];
    }
    updateMainButton();
}

function updateMainButton() {
    let items = Object.entries(selectedItems)
        .filter(([key, value]) => value > 0)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    
    if (items.length > 0) {
        tg.MainButton.setText(`Selected items: ${items}`);
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(JSON.stringify(selectedItems));
});

let usercard = document.getElementById("usercard");
let p = document.createElement("p");
p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
usercard.appendChild(p);
