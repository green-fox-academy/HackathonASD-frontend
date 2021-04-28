var express = require('express');
var router = express.Router();

router.get('/:productId', function (req, res) {
    let itemId = req.params.productId;
    res.render('item', {"itemId": itemId});
});

module.exports = router;