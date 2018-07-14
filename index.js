'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('Welcome to Virtual Agent Bot Fullfilment Service');
});

app.post('/webhook', function(req,res){
    var action = req.body.queryResult.action;
    if(action === 'welcome'){
        res.send('Welcome action is called');
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