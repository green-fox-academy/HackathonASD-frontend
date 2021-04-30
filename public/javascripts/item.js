var itemId = document.getElementById("myHiddenVar").innerHTML;

async function loadItems() {

    const response = await fetch('http://localhost:8080/item/' + itemId);
    const items = await response.json();
    return items;
}

function createNewDiv(item) {
    var mainDiv = document.getElementById("item");

    var header = document.createElement("H1")
    var headerText = document.createTextNode(item.name);
    header.appendChild(headerText);
    mainDiv.appendChild(header);

    var frameDiv = document.createElement("DIV");

    var p = document.createElement("P");
    p.appendChild(document.createTextNode("Quantity: "));


    var cost = document.createElement("span");
    cost.setAttribute("id", "cost");

    cost.appendChild(document.createTextNode(item.cost + " $"));


    var image = document.createElement("IMG");
    image.src = item.linkToImage;
    frameDiv.appendChild(image);
    frameDiv.appendChild(cost);

    mainDiv.appendChild(frameDiv);

    var quantitySelector = document.createElement("INPUT");
    quantitySelector.setAttribute("type", "number");
    quantitySelector.defaultValue = 1;
    mainDiv.appendChild(quantitySelector);


    var addToCartButton = document.createElement("BUTTON");

    var div = document.createElement("DIv");

    div.appendChild(p);

    div.appendChild(quantitySelector);


    addToCartButton.innerHTML = 'Add to cart';
    addToCartButton.onclick = function () {
        let cart = [];
        if (localStorage.getItem('hackathon-cart')) {
            let cartSaved = JSON.parse(localStorage.getItem('hackathon-cart'));
            let alreadyContained = false;
            for (const i in cartSaved) {
                if (cartSaved[i].productId == item.id) {
                    cartSaved[i].quantity = Number(cartSaved[i].quantity) + Number(quantitySelector.value);
                    cart.push(cartSaved[i]);
                    alreadyContained = true;
                } else { cart.push(cartSaved[i]); }
            }
            if (!alreadyContained) {
                cart.push({ 'productId': item.id, 'quantity': Number(quantitySelector.value) });
                alreadyContained = false;
            }
            localStorage.setItem('hackathon-cart', JSON.stringify(cart));
        } else {
            cart.push({ 'productId': item.id, 'quantity': Number(quantitySelector.value) });
            localStorage.setItem('hackathon-cart', JSON.stringify(cart));
        }
    };

    div.appendChild(addToCartButton);
    div.setAttribute("id", "div");

    mainDiv.appendChild(div);

    var descElement = document.createElement("H3")
    var desc = document.createTextNode(item.description);
    descElement.appendChild(desc);
    mainDiv.appendChild(descElement);

}

loadItems().then(items => createNewDiv(items));
