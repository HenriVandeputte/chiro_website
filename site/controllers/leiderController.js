var Leider = require('../models/leider');
const {body, validationResult} = require("express-validator");
const Groep = require("../models/groep");
const async = require("async");


// Display list of all Leiding.
exports.leider_list = function(req, res) {
    Groep.find({}).sort({orde : 1}).populate({path: 'leiding', options: {sort:{'leeftijd': '-1'}}}).exec(function (err, list_groepen) {
        if (err) { return next(err); }
        //succesful, so render
        res.render('DataPugs/leider_list', {title: 'Leidsters', groepen_list: list_groepen});
    });
};

// Display Leiding create form on GET.
exports.leider_create_get = function(req, res, next) {
    res.render('DataPugs/leider_form');
};

// Handle Leiding create on POST.
exports.leider_create_post =[
    body('voornaam').trim().isLength({min: 1}).escape(),
    body('achternaam').trim().isLength({min: 1}).escape(),
    body('leeftijd').trim().escape(),
    body('groep').trim().isLength({min: 1}).escape(),


    (req, res, next ) => {

        const errors = validationResult(req);

        var leider = new Leider(
            {
                voornaam: req.body.voornaam,
                achternaam: req.body.achternaam,
                groep: req.body.groep,
                leeftijd: req.body.leeftijd,
                fotolink: req.body.fotolink
            }
        );

        if(!errors.isEmpty()){
            res.render('DataPugs/leider_form', {leider: leider, errors: errors.array()});
        }
        else{
            Leider.findOne({'voornaam': req.body.voornaam, 'achternaam': req.body.achternaam}).exec(function (err, found_leider){
                    if(err){return next(err);}
                    if(found_leider){
                        res.redirect('/data/leiding/');
                    }
                    else {
                        leider.save(function (err){
                            if (err) {return next(err);}
                            res.redirect('/data/leiding/');
                        });
                        Groep.findOneAndUpdate(
                            { 'naam': req.body.groep },
                            { $push: {leiding : leider._id } },
                            function (error, success) {
                                if (error) {return next(error);}
                            }
                        )
                    }
                }
            );
        }
    }
]

// Display Leider delete form on GET.
exports.leider_delete_get = function(req, res, next) {

    async.parallel({
        leider: function(callback) {

        }
    }, function(err, results) {
        if (err) { return next(err); }
        if (Leider.findById(req.params.id).exec(callback)==null) { // No results.
            res.redirect('/data/leiding');
        }
        // Successful, so render.
        res.render('DataPugs/leider_delete', {leider: results.leider} );
    });

};

// Handle Leiding delete on POST.
exports.leider_delete_post = function(req, res, next) {

    async.parallel({
        leider: function(callback) {
            Leider.findById(req.body.leiderid).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        else {
            // Author has no books. Delete object and redirect to the list of authors.
            Leider.findByIdAndRemove(req.body.leiderid, function deleteleider(err) {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/data/leiding')
            })
        }
    });
};


// Display Leiding update form on GET.
exports.leider_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Leiding update GET');
};

// Handle Leiding update on POST.
exports.leider_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Leiding update POST');
};
