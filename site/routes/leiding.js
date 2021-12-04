var express = require('express');
const Groep = require("../models/groep");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    Groep.find({}).sort({orde : 1}).populate({path: 'leiding', options: {sort:{'leeftijd': '-1'}}}).exec(function (err, list_groepen) {
        if (err) { return next(err); }
        //succesful, so render

        res.render('leiding', {groep_list: list_groepen});
    });
});

module.exports = router;
