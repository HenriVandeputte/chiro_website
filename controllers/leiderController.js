
const Leider = require('../models/leider');
const {body, validationResult} = require("express-validator");
const Groep = require("../models/groep");
const async = require("async");
const {render} = require("pug");


// Display list of all Leiding.
exports.leider_list_get = function(req, res) {
    Groep.find({}).sort({orde : 1}).populate({path: 'leiding', options: {sort:{'leeftijd': '-1'}}}).exec(function (err, list_groepen) {
        if (err) { return next(err); }
        //succesful, so render
        res.render('DataPugs/leider_list', {title: 'Leiding', groepen_list: list_groepen});
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

        const leider = new Leider(
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
                            function (error) {
                                if (error) {return next(error);}
                            }
                        )
                    }
                }
            );
        }
    }
]


exports.leider_list_post = [
    body('leiderId').escape(),
    (req, res) => {
        req.body;
        const leider = Leider.findById(req.body.leiderId);
            if(!leider){res.redirect('/data');}
            else if(leider) {
                Leider.deleteOne({_id: req.body.leiderId}).then(result =>{
                    res.redirect('/leiding')
                });
            }
    }
]