var express = require('express');
var router = express.Router();
var Lid = require('../models/lid')
const { body,validationResult } = require('express-validator');


// Display lid create form on GET.
router.get('/', function(req, res, next) {
    res.render('inschrijven.pug', {title: 'inschrijven'});
});

// Handle Groep create on POST.
router.post('/', [
    body('naam').trim().isLength({min: 1}).escape().withMessage('Naam moet ingevuld zijn.'),

    (req, res, next ) => {

        const errors = validationResult(req);

        var lid = new Lid(
            {
                naam: req.body.naam,
                leeftijd: req.body.leeftijd
            }
        );

        if(!errors.isEmpty()){
            res.render('inschrijven', {title: 'Inschrijven van lid', lid: lid, errors: errors.array()});
            return;
        }
        else{
            Lid.findOne({ 'naam': req.body.name}).exec(function (err, found_lid){
                    if(err){return next(err);}
                    if(found_lid){
                        res.redirect('/');
                    }
                    else {
                        lid.save(function (err){
                            if (err) {return next(err);}
                            res.redirect('/');
                        });
                    }
                }
            );
        }
    }
]
)

module.exports = router;