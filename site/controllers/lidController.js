var Lid = require('../models/lid');


// Display list of all Leden.
exports.lid_list = function(req, res) {
    Lid.find({}, 'naam').sort({naam : 1}).exec(function (err, list_leden) {
        if (err) { return next(err); }
        //succesful, so render

        res.render('lid_list', {title: 'Leden list', leden_list: list_leden});
    });
};

// Display detail page for a specific Lid.
exports.lid_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Lid detail: ' + req.params.id);
};

// Display Lid create form on GET.
exports.lid_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Lid create GET');
};

// Handle Lid create on POST.
exports.lid_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Lid create POST');
};

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
