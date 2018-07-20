const express = require('express');
var router = express.Router();

const controller = require('../controllers/myTestFulfillmentController');

router.use(function(req, res, next){
    console.log(req.method, req.originalUrl);
    next();
}); 

router.get('/', function(req, res){
    res.send('welcome to my test Fullfillment service!');
});

router.post('/', controller.handlerIntent);

module.exports = router