module.exports = async function (context, req) {
    context.log.info('JavaScript HTTP trigger function processed a request.');

    var website = req.query.website || "AC";
    var includePartners = req.query.includePartners || true;
    var fromCity = req.query.fromCity || "";
    var toCity = req.query.toCity || "";
    var oneWay = req.query.oneWay || false;
    var cabin = req.query.cabin || "business";
    var start = req.query.start || "2020-01-01";
    var end = req.query.end || "2020-07-01";
    var quantity = req.query.quantity || 2;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Searching for " + fromCity + " to " + toCity
    };

    var jsonStr = "{ " + 
                        "website: '" + website + "'" + 
                        ", partners: " + includePartners + 
                        ", from: '" + fromCity + "'" +
                        ", to: '" + toCity + "'" + 
                        ", oneway: " + oneWay + 
                        ", cabin: '" + cabin + "'" + 
                        ", start: '" + start + "'" + 
                        ", end: '" + end + "'" + 
                        ", quantity: " + quantity + 
                        ", reverse: false" + 
                 " }";

    // TODO: fill up the SB queue msg with all the stuff from the HTTP post (req)
    // NOTE: looks like so far JS only supports setting the message itself (no metadata?)
    //   https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus#output---javascript-example
    context.bindings.outputSbQueue = jsonStr;
};