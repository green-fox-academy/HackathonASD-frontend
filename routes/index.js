var express = require("express");
var router = express.Router();

/*async function loadItems() {
  const BACKEND_URL = await fetch("/api").then((res) => {
    return res.text();
  });

  const response = await fetch(BACKEND_URL + "/page");

  return response;
}

const items = loadItems();*/

router.get("/", function (req, res, next) {
  res.render("index"/*, items*/);
});

module.exports = router;
