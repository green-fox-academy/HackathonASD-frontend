async function fetchItems() {
  const response = await fetch("https://fakestoreapi.com/products");

  const res = await response.json();

  return res;
}

function renderItems(array) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    let spanTitle = document.createElement("span");
    spanTitle.classList.add("title");

    let spanPrice = document.createElement("span");
    spanPrice.classList.add("price");

    let frame = document.createElement("div");
    frame.classList.add("frame");

    let spanImage = document.createElement("img");

    spanTitle.appendChild(document.createTextNode(element.title));

    frame.appendChild(spanTitle);
    spanImage.src = element.image;
    frame.appendChild(spanImage);
    
    spanPrice.appendChild(document.createTextNode(element.price + " Dindong"));
    frame.appendChild(spanPrice);

    let liElement = document.createElement("LI");

    liElement.appendChild(frame);

    let list = document.getElementById("item-list");
    list.appendChild(liElement);
  }
}

fetchItems().then((data) => renderItems(data));
