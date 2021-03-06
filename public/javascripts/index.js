async function fetchItems(
  currentPage = 0,
  limit = 5,
  order = "name",
  direction = "desc"
) {
  var size = limit;
  var page = currentPage;
  var sort = order;
  var orderBy = direction;

  const response = await fetch(
    "http://localhost:8080/item?size=" +
    size +
    "&page=" +
    page +
    "&sort=" +
    sort +
    "," +
    orderBy
  );

  const res = await response.json();

  return res;
}

function renderItems(array) {
  removeChild();

  var discountButton = document.createElement("BUTTON");
  discountButton.innerText = "Discounts only";
  discountButton.id = "discount";
  discountButton.onclick = function () {
    fetchDiscounted().then((data) => renderItems(data));
  };
  document.getElementById("searchbar").appendChild(discountButton);

  var searchBar = document.createElement("INPUT");
  searchBar.setAttribute("type", "text");
  searchBar.id = "searchText";
  searchBar.defaultValue = "Search here";
  document.getElementById("searchbar").appendChild(searchBar);

  var searchButton = document.createElement("BUTTON");
  searchButton.innerHTML = "Search";
  searchButton.id = "searchButton";
  searchButton.onclick = function () {
    const filteredItems = array.content.filter(item =>
      item.name.includes(searchBar.value) ||
      item.description.includes(searchBar.value)
    );
    array.content = filteredItems;
    renderItems(array);
  };
  document.getElementById("searchbar").appendChild(searchButton);

  for (let i = 0; i < array.content.length; i++) {
    const element = array.content[i];

    let spanTitle = document.createElement("span");
    spanTitle.classList.add("title");

    let spanCost = document.createElement("span");
    spanCost.classList.add("cost");

    let frame = document.createElement("div");
    frame.classList.add("frame");

    let spanImage = document.createElement("img");

    spanTitle.appendChild(document.createTextNode(element.name));

    frame.appendChild(spanTitle);
    if (element.discountRate > 0) {
      let discountDiv = document.createElement("DIV");
      discountDiv.appendChild(document.createTextNode("Discount: " +
        element.discountRate + "% Original price: " + element.cost + " $"));
      element.cost = element.cost * (100 - element.discountRate) / 100;
      frame.appendChild(discountDiv);
    }
    spanImage.src = element.linkToImage;
    frame.appendChild(spanImage);

    spanCost.appendChild(document.createTextNode(element.cost + " $"));
    frame.appendChild(spanCost);

    let wishlistButton = document.createElement("BUTTON");
    let spanHeart = document.createElement("span");
    spanHeart.className = "glyphicon glyphicon-heart";
    spanHeart.appendChild(document.createTextNode(" Add to wishlist"));
    //wishlistButton.onclick = TODO
    wishlistButton.appendChild(spanHeart);
    frame.appendChild(wishlistButton);

    frame.addEventListener("click", function () {

      window.location.replace("/item/" + element.id);

      // fetchItems(Number(page.id) - 1).then((data) => renderItems(data));
    });

    let liElement = document.createElement("LI");

    liElement.appendChild(frame);

    let list = document.getElementById("item-list");
    list.appendChild(liElement);
  }

  for (let i = 0; i < array.totalPages; i++) {
    const element = i;

    let page = document.createElement("a");
    page.appendChild(document.createTextNode(element + 1));

    let pagination = document.getElementById("pagination");
    page.setAttribute("id", i + 1);

    page.addEventListener("click", function () {
      fetchItems(Number(page.id) - 1).then((data) => renderItems(data));
    });

    pagination.appendChild(page);
  }

  function removeChild() {
    const myNode = document.getElementById("item-list");

    const searchNode = document.getElementById("searchbar");
    while (searchNode.lastElementChild) {
      searchNode.removeChild(searchNode.lastElementChild);
    }
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild);
    }

    const paginationNode = document.getElementById("pagination");
    while (paginationNode.lastElementChild) {
      paginationNode.removeChild(paginationNode.lastElementChild);
    }
  }
}

async function fetchDiscounted() {
  const response = await fetch(
    "http://localhost:8080/item?filter=discounted"
  );
  const res = await response.json();
  return res;
}

fetchItems().then((data) => renderItems(data));
