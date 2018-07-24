
module.exports.makeMockedRemoteCall = function(success, result, delayInMilliSeconds){

    return new Promise(function(resolve, reject){

        setTimeout(function(){
            if(success){
                resolve(result);
            } else {
                reject(result);
            }
        }, delayInMilliSeconds);
    });
};

module.exports.createFulfillmentMessages = function (messages){
    return {
        "fulfillmentMessages": [{
            "text": {
                "text": messages
            }
        }]
    };
};