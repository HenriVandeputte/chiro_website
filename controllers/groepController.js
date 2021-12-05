const Groep = require('../models/groep');
const Leider = require('../models/leider');
const Lid = require('../models/lid');
const { body,validationResult } = require('express-validator');
const async = require('async');


exports.index = function(req, res) {
    async.parallel({
        groep_count: function (callback){
            Groep.countDocuments({}, callback);
        },
        leider_count: function (callback){
            Leider.countDocuments({}, callback);
        },
        lid_count: function (callback){
            Lid.countDocuments({}, callback);
        }
    }, function (err, results){
        res.render('DataPugs/index', {title: 'Data van Meisjeschiro Marke', error: err, data: results});
        });
};


// Display list of all Groeps.
exports.groep_list = function(req, res, next) {

    Groep.find({}, 'naam leeftijdString beschrijving orde').sort({orde : 1}).populate('leden').populate('leiding').exec(function (err, list_groepen) {
        if (err) { return next(err); }
        //succesful, so render
        res.render('DataPugs/groep_list', {title: 'Groepen', groep_list: list_groepen});
    });
};

// Display detail page for a specific Groep.
exports.groep_detail = function(req, res, next) {

    async.parallel({
        groep: function (callback){
            Groep.findById(req.params.id).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.groep==null) { // No results.
            const err = new Error('Geen groep gevonden');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('DataPugs/groep_detail', { title: 'Groep Detail', groep: results.groep} );
    });
};

// Display Groep create form on GET.
exports.groep_create_get = function(req, res, next) {
    res.render('DataPugs/groep_form', { title: 'Create Groep' });
};

// Handle Groep create on POST.
exports.groep_create_post =  [

    // Validate and santize the name field.
    body('naam').trim().isLength({ min: 1 }).escape().withMessage('Name must be specified.'),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a groep object with escaped and trimmed data.
        const groep = new Groep(
            {naam: req.body.naam}
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('DataPugs/groep_form', { title: 'Create Groep', groep: groep, errors: errors.array()});

        }
        else {
            // Data from form is valid.
            // Check if Groep with same name already exists.
            Groep.findOne({ 'naam': req.body.name })
                .exec( function(err, found_groep) {
                    if (err) { return next(err); }
                    if (found_groep) {
                        // groep exists, redirect to catalog home page.
                        res.redirect('/data/groepen');
                    }
                    else {
                        groep.save(function (err) {
                            if (err) { return next(err); }
                            // Groep saved. Redirect to catalog home page.
                            res.redirect('/data/groepen');
                        });
                    }
                });
        }
    }
];


