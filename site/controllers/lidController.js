const Lid = require('../models/lid');
const {body, validationResult} = require("express-validator");
const Groep = require("../models/groep");


// Display list of all Leden.
exports.lid_list = function(req, res) {
    Groep.find({}).sort({orde : 1}).populate('leden').exec(function (err, list_groepen) {
        if (err) { return next(err); }
        //succesful, so render

        res.render('DataPugs/lid_list', {title: 'Leden list', groepen_list: list_groepen});
    });
};

// Display detail page for a specific Lid.
exports.lid_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Lid detail: ' + req.params.id);
};

// Display lid create form on GET.
exports.lid_create_get = function(req, res) {
    res.render('lid_form', { title: 'Create Lid' });
};

// Handle Groep create on POST.
exports.lid_create_post =  [

    // Validate and santize the name field.
    body('name', 'Lid name required').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a lid object with escaped and trimmed data.
        const lid = new Lid(
            {naam: req.body.name}
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('lid_form', { title: 'Create Lid', lid: lid, errors: errors.array()});
        }
        else {
            // Data from form is valid.
            // Check if lid with same name already exists.
            Lid.findOne({ 'naam': req.body.name })
                .exec( function(err, found_lid) {
                    if (err) { return next(err); }

                    if (found_lid) {
                        // lid exists, redirect to leden page.
                        res.redirect('/catalog/leden');
                    }
                    else {

                        lid.save(function (err) {
                            if (err) { return next(err); }
                            // Lid saved. Redirect to leden page.
                            res.redirect('/catalog/leden');
                        });

                    }

                });
        }
    }
];

// Display Lid delete form on GET.
exports.lid_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Lid delete GET');
};

// Handle Lid delete on POST.
exports.lid_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Lid delete POST');
};

// Display Lid update form on GET.
exports.lid_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Lid update GET');
};

// Handle Lid update on POST.
exports.lid_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Lid update POST');
};
