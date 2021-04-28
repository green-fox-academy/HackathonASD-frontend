async function loadItems() {

    const response = await fetch('http://localhost:8080/item/' + itemId);
    const items = await response.json();
    return items;
}

function createNewDiv() {
    let items = JSON.parse(localStorage.getItem('hackathon-cart'));
    var mainDiv = document.getElementById("cart");
    items.forEach(element => {
       console.log(element.quantity);
    });
    var item;

    items.array.forEach(element => {
        console.log(element);
    });

    var header = document.createElement("H1")
    var headerText = document.createTextNode(item.name);
    header.appendChild(headerText);
    mainDiv.appendChild(header);

    var image = document.createElement("IMG");
    image.src = item.linkToImage;
    mainDiv.appendChild(image);

    var quantitySelector = document.createElement("INPUT");
    quantitySelector.setAttribute("type", "number");
    quantitySelector.defaultValue = 1;
    mainDiv.appendChild(quantitySelector);


    var addToCartButton = document.createElement("BUTTON");
    addToCartButton.innerHTML = 'Add to cart';
    addToCartButton.onclick = function () {
        let cart = [];
        if (localStorage.getItem('hackathon-cart')) {
            cart = JSON.parse(localStorage.getItem('hackathon-cart'));
        }
        cart.push({ 'productId': item.id, 'quantity': quantitySelector.value });
        localStorage.setItem('hackathon-cart', JSON.stringify(cart));
    };
    mainDiv.appendChild(addToCartButton);

    var descElement = document.createElement("H3")
    var desc = document.createTextNode(item.description);
    descElement.appendChild(desc);
    mainDiv.appendChild(descElement);

}

createNewDiv();

loadItems().then(items => createNewDiv(items));
