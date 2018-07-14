'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
 }));

app.get('/', function(req, res){
    res.send('Welcome to Virtual Agent Bot Fullfilment Service');
});

app.route('/').post(function(req,res){
    var action = req.body.queryResult.action;
    if(action === 'welcome'){
        res.json({
            "fulfillmentText": "MyWebHook: Welcome action has been processed!",
            "fulfillmentMessages": [{
                'text': {
                    'text': ['MyWebHook: Welcome action']
                }
            }]
        });
    } else if (action === 'cancelflight'){
        res.json({
            'fulfillmentMessages': [{
                'text': {
                    'text': ['OK, we will cancel your flight.']
                }
            }]
        });
    } else {
        res.send('unknown action. action: ' + action);
    }
});

// start the server
app.listen(process.env.PORT || 8000, function () {
    console.log('webhook server started');
});