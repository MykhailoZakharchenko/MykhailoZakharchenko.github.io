let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let selectedItems = {};

document.querySelectorAll('.btn.add').forEach(button => {
    button.addEventListener('click', function() {
        let itemId = this.id.replace('btn', '');
        selectedItems[itemId] = (selectedItems[itemId] || 0) + 1;
        updateMainButton();
    });
});

document.getElementById('increase-hotdog').addEventListener('click', function() {
    updateQuantity('hotdog', 1);
});

document.getElementById('decrease-hotdog').addEventListener('click', function() {
    updateQuantity('hotdog', -1);
});

function updateQuantity(item, change) {
    let quantityElement = document.getElementById(`quantity-${item}`);
    let quantity = parseInt(quantityElement.innerText) + change;
    if (quantity < 0) quantity = 0;
    quantityElement.innerText = quantity;
    selectedItems[item] = quantity;
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
