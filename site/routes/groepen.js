var express = require('express');
var router = express.Router();
var Groep = require('../models/groep');


/* GET home page. */
router.get('/', function(req, res, next) {
    Groep.find({}, 'naam ').sort({naam : 1}).exec(function (err, list_groepen) {
        if (err) { return next(err); }
        //succesful, so render

        res.render('groepen', {title: 'Groepen list', groep_list: list_groepen});
    });
});

//////////////////////////////////////////////////////

module.exports = router;
