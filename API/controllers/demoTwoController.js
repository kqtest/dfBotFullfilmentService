const util = require('../../util');

let itinsAlreadyCanceled = [ '789789789789'];
let validEmails = [ 'todd@expedia.com', 'ryan@expedia.com', 'tom@gmail.com'];
let validPhones = [ '4253332222' ];

var handleIntent = function(req, res) {
    let queryResult = req.body.queryResult;
    let action = queryResult.action;
    console.log("handling action: " + action);
    console.log("Request Body: " + queryResult.body);

    let defaultMsg = 'Welcome to DEMO fulfillment service! action = ' + action;
    
    if(action === 'welcome'){
         res.json(util.createFulfillmentMessages([defaultMsg, 'Welcome!!!']));
    } else if(action == 'cancelBooking'){
        if(validEmails.includes(queryResult.parameters['email'])){
            res.json(util.createFulfillmentMessages(["Please provide your itinerary number."]));
        } else {
            res.json(util.createFulfillmentMessages(["We can't match your email address. Can you provide your phone number?"]));
        }
    } else if(action === 'phoneAuthentication'){
        let phoneNumber = queryResult.parameters["number"];
        if(validPhones.includes(phoneNumber)){
            res.json(
                util.createFulfillmentMessages(['"Please provide your itinerary number.'])
            );            
        } else {
            res.json(
                util.createFulfillmentMessages(['We cannot recognize you.'])
            );
        }
    } else if(action === 'getItineraryNumber'){
        let itin = queryResult.parameters["itineraryNumber"];
        let email = queryResult.outputContexts[0].parameters["email"].trim();
        let userName = email.split('@')[0];
        if(itin) {
            res.json(
                util.createFulfillmentMessages(['Hi ' + userName + ', your booking is already cancelled, second refund will be convinient for you.'])
            );
        } else {
            res.json(
                util.createFulfillmentMessages(['Itinerary number is not valid'])
            );
        }

    } else {
        res.json(util.createFulfillmentMessages([defaultMsg]));
    }
};

module.exports.handlerIntent = handleIntent;