var Groep = require('../models/groep');


exports.index = function(req, res) {
    res.render('groepen.pug', {title : 'Evenementen'});
};

// Display list of all Groeps.
exports.groep_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Groep list');
};

// Display detail page for a specific Groep.
exports.groep_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Groep detail: ' + req.params.id);
};

// Display Groep create form on GET.
exports.groep_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Groep create GET');
};

// Handle Groep create on POST.
exports.groep_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Groep create POST');
};

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
