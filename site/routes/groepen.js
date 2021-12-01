var express = require('express');
var router = express.Router();
var Groep = require('../models/groep');
const async = require("async");


/* GET home page. */
router.get('/', function(req, res, next) {
    Groep.find({}, 'naam leeftijdString').sort({nummer : 1}).exec(function (err, list_groepen) {
        if (err) { return next(err); }
        //succesful, so render

        res.render('groepen', {title: 'Groepen list', groep_list: list_groepen});
    });
});


router.get('/groep/id:', function(req, res, next) {

    async.parallel({
        groep: function (callback){
            Groep.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.groep==null) { // No results.
            var err = new Error('Geen groep gevonden');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('groep_detail', { title: 'Groep Detail', groep: results.groep} );
    });
})

//////////////////////////////////////////////////////

module.exports = router;
