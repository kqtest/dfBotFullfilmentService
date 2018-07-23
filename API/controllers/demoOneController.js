const util = require('../../util');

let validEmails = [ 'todd@expedia.com', 'ryan@expedia.com', 'tom@gmail.com'];
let validPhones = [ '4253332222' ];

var handleIntent = function(req, res) {
    let queryResult = req.body.queryResult;
    let action = queryResult.action;
    console.log("handling action: " + action);

    let defaultMsg = 'Welcome to my test fulfillment service! action = ' + action;
    
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
    } else {
        res.json(util.createFulfillmentMessages([defaultMsg]));
    }
};

module.exports.handlerIntent = handleIntent;