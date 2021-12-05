var express = require('express');
var router = express.Router();
var Lid = require('../models/lid')
var Groep = require('../models/groep')
const { body,validationResult } = require('express-validator');


// Display lid create form on GET.
router.get('/', function(req, res, next) {
    res.render('inschrijven.pug');
});

// Handle Groep create on POST.
router.post('/', [
    body('voornaam').trim().isLength({min: 1}).escape().withMessage('Vooraam moet ingevuld zijn.'),
        body('achternaam').trim().isLength({min: 1}).escape().withMessage('Achternaam moet ingevuld zijn.'),
        body('email').trim().isLength({min: 1}).escape().withMessage('Email moet ingevuld zijn.'),

    (req, res, next ) => {

        const errors = validationResult(req);

        var lid = new Lid(
            {
                voornaam: req.body.voornaam,
                achternaam: req.body.achternaam,
                leeftijd: req.body.leeftijd,
                email: req.body.email
            }
        );

        if(!errors.isEmpty()){
            res.render('inschrijven', {lid: lid, errors: errors.array()});
        }
        else{
            Lid.findOne({'voornaam': req.body.voornaam, 'achternaam': req.body.achternaam}).exec(function (err, found_lid){
                    if(err){return next(err);}
                    if(found_lid){
                        res.redirect('/');
                    }
                    else {
                        lid.save(function (err){
                            if (err) {return next(err);}
                            res.redirect('/');
                        });
                        Groep.findOneAndUpdate(
                            { 'leeftijd': req.body.leeftijd },
                            { $push: {leden : lid } },
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
)

module.exports = router;