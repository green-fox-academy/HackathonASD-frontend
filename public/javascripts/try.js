async function loadItems() {

    const response = await fetch('http://localhost:8080/item/1');
    const items = await response.json();
    return items;
}

function createNewDiv(objectArray) {

    var element = document.createElement("div");
    element.appendChild(document.createTextNode(objectArray.name));
    document.getElementById('lc').appendChild(element);

    /*    objectArray.forEach((element) => {
            let innerDiv = document.createElement("div");
            innerDiv.innerHTML = element.name;
    
            div.appendChild(innerDiv);
        });
    */
}

loadItems().then(items => createNewDiv(items));
