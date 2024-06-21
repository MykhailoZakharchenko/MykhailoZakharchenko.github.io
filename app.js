let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let selectedItems = new Set();

function updateMainButton() {
    if (selectedItems.size > 0) {
        tg.MainButton.setText(`Selected items: ${[...selectedItems].join(', ')}`);
        tg.MainButton.show();
    } else {
        tg.MainButton.hide();
    }
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        let itemId = this.id.replace('btn', '');
        if (selectedItems.has(itemId)) {
            selectedItems.delete(itemId);
        } else {
            selectedItems.add(itemId);
        }
        updateMainButton();
    });
});

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData([...selectedItems].join(','));
});

let usercard = document.getElementById("usercard");
let p = document.createElement("p");
p.innerText = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`;
usercard.appendChild(p);
