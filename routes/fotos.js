const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('fotos.pug', {title: 'Fotos'});
});

module.exports = router;
