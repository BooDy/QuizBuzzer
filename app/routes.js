var express  = require('express');
var router   = express.Router();

router.get('/', function(req, res, next){
     res.render("play");
});

router.get('/dashboard', function(req, res, next){
     res.render('dashboard');
});

router.get('/login', function(req, res) { 

});

router.get('/admin', function(req, res) { 

});

router.get('/profile', function(req, res) { 

});


module.exports = router;
