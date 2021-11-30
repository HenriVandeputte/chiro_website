var Groep = require('../models/groep');
var Leider = require('../models/leider');
var Lid = require('../models/lid');

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
