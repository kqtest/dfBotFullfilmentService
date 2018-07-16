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
    } else if (action === 'cancelFlight'){

        let cancelResponse = executeFlightCancel();
        placeAgentQueue()
        let isPackage = findLodging();
        //agent.add(`cancelResponse: ` + JSON.stringify(cancelResponse) + ` :: cancelResult: ` + cancelResponse.result + ` :: cancelData:` + cancelResponse.data);
        if (cancelResponse.result) {
           
            sendResponseMessage(res, [`OK, cancelled.`]);
            if(isPackage) {
                sendResponseMessage(res, ['Do you want to cancel your lodging as well?']);
            }
           
        } else {
            //In case of real disasters
            sendResponseMessage(res, [`We've experience some issues, we are going to hand you to live agent.`]);
        }
    } else if (action === 'acceptLodgingCancel'){
         //STUB APISs
         let customerResponse = true;
         if (customerResponse) {
             let cancelResponse = executeLodgingCancel();
             if (cancelResponse.result) {
                 applyWaiver();
                 sendResponseMessage(res, [`OK, lodging is cancelled.`]);
             } else {
                sendResponseMessage(res, [`We've experience some issues, we are going to hand you to live agent.`]);
             }
        }
    } else if(action == 'declineLodingCancel') {
        sendResponseMessage(res, ['Good Bye!']);
    } else {
        sendResponseMessage(res, ['I have problem understanding your intent, you need to conect with a live agent']);
    }
});

// start the server
app.listen(process.env.PORT || 8000, function () {
    console.log('webhook server started');
});

function sendResponseMessage(res, messages){
    res.json({
        'fulfillmentMessages': [{
            'text': {
                'text': messages
            }
        }]
    });
}

function executeFlightCancel() {
    //STUB APIs
    let result = true;
   
    return {'result':result, 'data': 'some data'};
}

function executeFlightCancelAxios() {
    //STUB APIs
    let url = 'https://www.google.com';
    return axios.get(url);
}

function executeLodgingCancel() {
    //STUB APIs
    let result = true;
    
     return {'result':result, 'data': 'no data'};
}

function applyWaiver() {
    //STUB APIs
    let result = true;
    
     return {'result':result, 'data': 'no data'};
}

function findLodging() {
    //STUB APIs
    var result = true;
    return result;
}

function placeAgentQueue() {
    //STUB APIs
    var result = true;
    return result;
}