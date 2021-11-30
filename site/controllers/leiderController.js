var Leider = require('../models/leider');


// Display list of all Leiding.
exports.leider_list = function(req, res) {
    Leider.find({}, 'naam').sort({naam : 1}).exec(function (err, list_leiders) {
        if (err) { return next(err); }
        //succesful, so render

        res.render('leider_list', {title: 'Leider list', leider_list: list_leiders});
    });
};

// Display detail page for a specific Leiding.
exports.leider_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Leiding detail: ' + req.params.id);
};

// Display Leiding create form on GET.
exports.leider_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Leiding create GET');
};

// Handle Leiding create on POST.
exports.leider_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Leiding create POST');
};

// Display Leiding delete form on GET.
exports.leider_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Leiding delete GET');
};

// Handle Leiding delete on POST.
exports.leider_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Leiding delete POST');
};

// Display Leiding update form on GET.
exports.leider_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Leiding update GET');
};

// Handle Leiding update on POST.
exports.leider_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Leiding update POST');
};
