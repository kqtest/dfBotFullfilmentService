const express = require('express');
var router = express.Router();

const controller = require('../controllers/demoOneController');

router.use(function(req, res, next){
    console.log(req.method, req.originalUrl);
    next();
}); 

router.get('/', function(req, res){
    res.send('Welcome to DialogFlow Demo One: a happy path demo!');
});

router.post('/', controller.handlerIntent);

module.exports = router;