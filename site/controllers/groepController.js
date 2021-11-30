var Groep = require('../models/groep');
var Leider = require('../models/leider');
var Lid = require('../models/lid')
const { body,validationResult } = require('express-validator');


var async = require('async');


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
        res.render('index', {title: 'Local catalog home', error: err, data: results});
        });
};


// Display list of all Groeps.
exports.groep_list = function(req, res, next) {

    Groep.find({}, 'naam').sort({naam : 1}).exec(function (err, list_groepen) {
        if (err) { return next(err); }
        //succesful, so render
        res.render('groep_list', {title: 'Group list', groep_list: list_groepen});
    });
};

// Display detail page for a specific Groep.
exports.groep_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Groep detail: ' + req.params.id);
};

// Display Groep create form on GET.
exports.groep_create_get = function(req, res, next) {
    res.render('groep_form', { title: 'Create Groep' });
};

// Handle Groep create on POST.
exports.groep_create_post =  [

    // Validate and santize the name field.
    body('name').trim().isLength({ min: 1 }).escape().withMessage('Name must be specified.'),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a groep object with escaped and trimmed data.
        var groep = new Groep(
            { naam: req.body.name }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('groep_form', { title: 'Create Groep', groep: groep, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if Groep with same name already exists.
            Groep.findOne({ 'naam': req.body.name })
                .exec( function(err, found_groep) {
                    if (err) { return next(err); }
                    if (found_groep) {
                        // groep exists, redirect to catalog home page.
                        res.redirect('/catalog/groepen');
                    }
                    else {
                        groep.save(function (err) {
                            if (err) { return next(err); }
                            // Groep saved. Redirect to catalog home page.
                            res.redirect('/catalog/groepen');
                        });
                    }
                });
        }
    }
];


// Display Groep delete form on GET.
exports.groep_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Groep delete GET');
};

// Handle Groep delete on POST.
exports.groep_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Groep delete POST');
};

// Display Groep update form on GET.
exports.groep_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Groep update GET');
};

// Handle Groep update on POST.
exports.groep_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Groep update POST');
};
