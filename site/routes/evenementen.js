var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('evenementen.pug', {title : 'Evenementen'});
});

module.exports = router;
