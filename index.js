'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const util = require('./util');
const request = require('request');

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

        let responseData = [];
        //let sessionId = req.body.session.split('/').pop();
        let cancelFlightCallPromise = executeFlightCancel();

        //sendResponseMessage(res, ['Processing ...']);

        cancelFlightCallPromise.then(function(result){
            //sendResponseMessage(res, ['Good! ' + result]);

        //     sendEventToAgent(sessionId).then(function(result){
        //         //handle result
        //         console.log('Agent call succeeded! Body: ' + JSON.stringify(result));
        //     }, function(err){
        //         //handle error
        //         console.log('Agent call failed! Error: ' + err);
        //     });

        placeAgentQueue();
        let isPackage = findLodging();
        let msg = ['OK, flight cancelled.'];

        if(isPackage) {
            msg.push('Do you want to cancel your lodging as well?');
        }

        sendResponseMessage(res, msg);

         }, function(err){
             //sendResponseMessage(res, ['Bad! ' + err]);
             sendResponseMessage(res, [`We've experience some issues, we are going to hand you to live agent.`]);
         });

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
    } else if(action == 'declineLodgingCancel') {
        sendResponseMessage(res, ['Good Bye!']);
    } else {
        sendResponseMessage(res, ['I have problem understanding your intent, we are going to hand you to live agent']);
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
    let result = 'cancel flight succeeded!',
    delay =  4000;
    return util.makeMockedRemoteCall(true, result, delay);
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

function sendEventToAgent(sessionId){
    let agentUrl = 'https://api.dialogflow.com/api/query?v=20150910';

    var postData = {
        'event': {
            'name': 'custom_notification',
            'data': {
                'result': 'my sample notification data'
            }
        },
        'timezone': 'America/Los_Angeles',
        'lang': 'en',
        'sessionId': sessionId
    }

    var options = {
        method: 'post',
        body: postData,
        json: true,
        url: agentUrl,
        headers: {
            'Authorization': 'Bearer 65cf81af318847dcba95c299e87e03fd', // fe778902c95f447798ce66ce7b9d9b84',
            'Content-Type': 'application/json'
          }
    }

    return new Promise(function(resolve, reject){
        request(options, function (err, res, body) {
            if (err) {
              reject(err);
            } else {
                resolve(body);
            }
          })
    });
}