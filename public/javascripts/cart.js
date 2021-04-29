async function loadItem(itemId) {

    const response = await fetch('http://localhost:8080/item/' + itemId);
    const item = await response.json();
    return item;
}

async function checkoutPressed(items) { //post order with token header

    const response = await fetch('http://localhost:8080/order', {
        method: 'POST',
        headers: {
            'X-meme-token': window.getItem('X-meme-token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(items) // body data type must match "Content-Type" header
    });
    const item = await response.json();
    return item;
}

var sumPrice = 0;

function createCartPage() {
    let items = JSON.parse(localStorage.getItem('hackathon-cart'));
    var mainDiv = document.getElementById('cart');

    var header = document.createElement("H1")
    var headerText = document.createTextNode("Cart");
    header.appendChild(headerText);
    mainDiv.appendChild(header);

    if (localStorage.getItem('hackathon-cart') !== null) {
        items.forEach(itemInCart => {
            loadItem(itemInCart.productId).then(item => {
                sumPrice += loadItemDom(item, mainDiv, itemInCart, sumPrice);
            });
        });
        setTimeout(function () { checkout(mainDiv, items); }, 1000); //fix it sometimes. should wait for async foreach...   
    } else {
        var header = document.createElement("H1")
        var headerText = document.createTextNode("Your cart is empty, we redirect you");
        header.style.color = "red";

        header.appendChild(headerText);
        mainDiv.appendChild(header);
        setTimeout(function () { window.location.replace("/"); }, 3000);
    }
}

function loadItemDom(item, mainDiv, itemInCart, sum) {

    var header = document.createElement("H2")
    var headerText = document.createTextNode(item.name);
    header.appendChild(headerText);
    mainDiv.appendChild(header);

    var header = document.createElement("H3")
    var headerText = document.createTextNode('Quantity in cart: ' + itemInCart.quantity + ' pcs');
    header.appendChild(headerText);
    mainDiv.appendChild(header);

    var header = document.createElement("H3")
    var headerText = document.createTextNode('Price per piece: ' + item.cost + '$');
    header.appendChild(headerText);
    mainDiv.appendChild(header);

    var header = document.createElement("H3")
    var headerText = document.createTextNode('Sum: ' + itemInCart.quantity * item.cost + '$');
    header.appendChild(headerText);
    mainDiv.appendChild(header);

    var image = document.createElement("IMG");
    image.src = item.linkToImage;
    mainDiv.appendChild(image);

    var deleteItem = document.createElement("BUTTON");
    deleteItem.innerHTML = 'Delete from cart';
    deleteItem.onclick = function () {
        let storageProducts = JSON.parse(localStorage.getItem('hackathon-cart'));
        let products = storageProducts.filter(product => product.productId !== itemInCart.productId);
        localStorage.setItem('hackathon-cart', JSON.stringify(products));
        location.reload();
    };
    mainDiv.appendChild(deleteItem);

    return sum += itemInCart.quantity * item.cost;
}

function checkout(mainDiv, items) {

    var sumText = document.createElement("H1")
    var headerText = document.createTextNode('To pay: ' + sumPrice + '$');
    sumText.appendChild(headerText);
    mainDiv.appendChild(sumText);

    var checkoutButton = document.createElement("BUTTON");
    checkoutButton.innerHTML = 'Checkout';
    checkoutButton.onclick = function () {
        checkoutPressed(items).then(() => {  //check if 200 .ok !!!
            localStorage.deleteItem('hackathon-cart');
        });
        location.reload();
    };
    mainDiv.appendChild(checkoutButton);
}

window.onload = createCartPage; //miután betölt, különben a #cart == null
