function date_diff_indays(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

function AddDaysToDate(thisDate, days) {
    const thisDateVal = thisDate.valueOf();
    var date = new Date(thisDateVal); //Date.UTC(thisDateVal);
    date.setDate(date.getDate() + days);
    return date;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = async function (context, req) {
    
    var website = req.query.website || "AC";
    var includePartners = req.query.includePartners || true;
    var fromCity = req.query.fromCity || "";
    var toCity = req.query.toCity || "";
    var oneWay = req.query.oneWay || false;
    var cabin = req.query.cabin || "business";
    var start = req.query.start || "2020-01-01";
    var end = req.query.end || "2020-07-01";
    var quantity = req.query.quantity || 2;

    const statusStr = "Searching for " + fromCity + " to " + toCity + " from " + start + " to " + end + " for " + quantity + " person(s)";
    context.log(statusStr);

    // because functions can only run for 10 minutes (and I don't really want to get into durable functions/chaining/etc), split this request up by date.
    const startDate = Date.parse(start);
    const endDate = Date.parse(end);

    const numDays = date_diff_indays(startDate, endDate);

    context.bindings.outputSbQueue = [];
    const incrementBy = 5;

    // inclusive
    for (var i=0; i<=numDays; i+=incrementBy) {

        const currentStart = AddDaysToDate(startDate, i);
        const currentEnd = AddDaysToDate(startDate, i + incrementBy - 1);

        // TODO: figure out where I'm accidentally setting to local instead of UTC!!!

        //const currentStartStr = currentStart.getUTCFullYear() + "-" + currentStart.getUTCMonth() + "-" + currentStart.getUTCDate();
        //var currentStartUtc = Date.UTC(currentStart.getUTCFullYear(), currentStart.getUTCMonth(), currentStart.getUTCDate());
        //var currentStartStr = currentStart.toLocaleDateString();
        //currentStartStr = currentStartStr.replace(/\//g, "-");
        const currentStartStr = formatDate(currentStart);

        //const currentEndStr = currentEnd.getUTCFullYear() + "-" + currentEnd.getUTCMonth() + "-" + currentEnd.getUTCDate();
        //var currentEndUtc = Date.UTC(currentEnd.getUTCFullYear(), currentEnd.getUTCMonth(), currentEnd.getUTCDate());
        //var currentEndStr = currentEnd.toLocaleDateString();
        //currentEndStr = currentEndStr.replace(/\//g, "-");
        const currentEndStr = formatDate(currentEnd);

        const itemToPush = {
            website: website, 
            partners: includePartners, 
            from: fromCity, 
            to: toCity, 
            oneway: oneWay, 
            cabin: cabin, 
            start: currentStartStr, 
            end: currentEndStr, 
            quantity: quantity, 
            reverse: false
        };

        context.log('Enqueuing item to the service bus queue for processing', itemToPush);
        context.bindings.outputSbQueue.push(itemToPush);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: statusStr
    };
};