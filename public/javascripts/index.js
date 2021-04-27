async function fetchItems() {
  const response = await fetch("https://fakestoreapi.com/products");

  const res = await response.json();

  return res;
}

function renderItems(array) {
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    console.log(element.title);

    let spanTitle = document.createElement("span");
    let spanCategory = document.createElement("span");
    let spanPrice = document.createElement("span");
    let spanDescription = document.createElement("span");

    
    let spanImage = document.createElement("img");

    spanTitle.appendChild(document.createTextNode(element.title));
    spanCategory.appendChild(document.createTextNode(element.category));
    spanPrice.appendChild(document.createTextNode(element.price));
    spanDescription.appendChild(document.createTextNode(element.description));
    spanImage.src = element.image;

    let liElement = document.createElement("LI");

    liElement.appendChild(spanTitle);
    liElement.appendChild(spanCategory);
    liElement.appendChild(spanPrice);
    liElement.appendChild(spanDescription);
    liElement.appendChild(spanImage);

    let list = document.getElementById("item-list");
    list.appendChild(liElement);
  }
}

fetchItems().then((data) => renderItems(data));
