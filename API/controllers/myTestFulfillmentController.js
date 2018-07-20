const util = require('../../util');

var handleIntent = function(req, res) {
    var action = req.body.queryResult.action;
    var defaultMsg = 'Welcome to my test fulfillment service! action = ' + action;

    if(action === 'welcome'){
         res.json(util.createFulfillmentMessages([defaultMsg, 'Welcome!!!']));
    } else if(action == 'cancelFlight'){
        res.json(util.createFulfillmentMessages(['Your flight is canceled!', defaultMsg]));
    } else if(action === 'followupeventtest'){
        console.log("handling followupeventtest ...");
        let responseData = util.createFulfillmentMessages(['Fulfilled - ' + action]);
        responseData.followupEventInput = {
            "name": "followupevent2",
            "languageCode": "en-US",            
            "parameters": {
                "param": "my sample parameter"
            }
        };
        res.json(responseData);

    } else if(action == 'followupeventtest2'){
        console.log("handling followupeventtest2 ...");
        res.json(
            util.createFulfillmentMessages(['followup event has been processed. Action: ' + action])
        );
    } else {
        res.json(util.createFulfillmentMessages([defaultMsg]));
    }
};

module.exports.handlerIntent = handleIntent;