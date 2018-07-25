const util = require('../../util');

let itinsAlreadyCanceled = [ '789789789789'];
let packageItins = ['777788889999'];
let validEmails = [ 'todd@expedia.com', 'ryan@expedia.com', 'tom@gmail.com'];
let validPhones = [ '4253332222' ];

var handleIntent = function(req, res) {
    let queryResult = req.body.queryResult;
    let action = queryResult.action;
    console.log("handling action: " + action);
    console.log("Request Body: " + JSON.stringify(queryResult));

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
                util.createFulfillmentMessages(['We cannot recognize you. Can you try again?'])
            );
        }
    } else if(action === 'getItineraryNumber'){
        let itin = queryResult.parameters["itineraryNumber"];
        let context = queryResult.outputContexts.find(function(x){
            return x.parameters && x.parameters["email"]; 
        });
        let email = context.parameters["email"];
        let userName = email.split('@')[0];
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        if(itin) {
            if(itinsAlreadyCanceled.includes(itin)){
                res.json(
                    util.createFulfillmentMessages(["Hmm.. looks like we already cancelled and refunded you yesterday. Are you sure you have your glasses on and are entering the correct Itinerary number?"])
                );
            } else if(packageItins.includes(itin)){
                res.json(
                    util.createFulfillmentMessages(["Welcome " + userName + ", the itinerary is part of a package. Do you want to cancel Air, Lodging or both?"])
                );
            } else {
                res.json(
                    util.createFulfillmentMessages(['Ok, your booking is cancelled.'])
                );                                
            }
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