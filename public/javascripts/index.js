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
    spanImage.src = element.linkToImage;
    frame.appendChild(spanImage);

    spanCost.appendChild(document.createTextNode(element.cost + " Dindong"));
    frame.appendChild(spanCost);

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
    while (myNode.lastElementChild) {
      myNode.removeChild(myNode.lastElementChild);
    }

    const paginationNode = document.getElementById("pagination");
    while (paginationNode.lastElementChild) {
      paginationNode.removeChild(paginationNode.lastElementChild);
    }
  }
}

fetchItems().then((data) => renderItems(data));
