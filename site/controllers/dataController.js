var express = require('express');
var router = express.Router();

// Require controller modules.
var groep_controller = require('./groepController');
var leider_controller = require('./leiderController');
var lid_controller = require('./lidController');



const isAuth = (req,res,next) =>{
    if(req.session.isAuth){
        next()
    } else {
        res.redirect('/login');
    }
};

// GET catalog home page.
router.get('/', isAuth, groep_controller.index);  //This actually maps to /catalog/ because we import the route with a /catalog prefix


/// GROEP ROUTES ///

// GET request for creating a groep. NOTE This must come before routes that display Book (uses id).
router.get('/groep/create',isAuth, groep_controller.groep_create_get);

// POST request for creating groep.
router.post('/groep/create',isAuth, groep_controller.groep_create_post);

// GET request for one groep.
router.get('/groep/:id',isAuth, groep_controller.groep_detail);

// GET request for list of all groep items.
router.get('/groepen',isAuth, groep_controller.groep_list);




/// LEIDER ROUTES ///

// GET request for creating Leider. NOTE This must come before route for id (i.e. display Leider).
router.get('/leider/create',isAuth, leider_controller.leider_create_get);

// POST request for creating leider.
router.post('/leider/create',isAuth, leider_controller.leider_create_post);


// GET request to update leider.
router.get('/leider/:id/update',isAuth, leider_controller.leider_update_get);

// POST request to update leider.
router.post('/leider/:id/update',isAuth, leider_controller.leider_update_post);

// GET request for list of all leiders.
router.get('/leiding',isAuth, leider_controller.leider_list_get);
// GET request for list of all leiders.
router.post('/leiding',isAuth, leider_controller.leider_list_post);




/// LID ROUTES ///

// GET request for creating a Lid. NOTE This must come before route that displays Lid (uses id).
router.get('/lid/create',isAuth, lid_controller.lid_create_get);

//POST request for creating lid.
router.post('/lid/create',isAuth, lid_controller.lid_create_post);

// GET request to delete lid.
router.get('/lid/:id/delete',isAuth, lid_controller.lid_delete_get);

// POST request to delete lid.
router.post('/lid/:id/delete',isAuth, lid_controller.lid_delete_post);


// GET request for list of all leden.
router.get('/leden',isAuth, lid_controller.lid_list);



module.exports = router;
