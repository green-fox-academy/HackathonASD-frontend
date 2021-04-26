var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send(process.env.BACKEND_URL);
});

module.exports = router;