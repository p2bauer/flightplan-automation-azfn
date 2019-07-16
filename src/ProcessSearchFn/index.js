const cliSearch = require('../flightplan/shared/search');

module.exports = async function(context, mySbMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);

    mySbMsg.headless = true;
    mySbMsg.proxy = "";
    mySbMsg.docker = true;
    mySbMsg.remotechrome = process.env.REMOTECHROME;
    mySbMsg.credentials = process.env.ACCOUNTS;
    if (process.env.INCOGNITO === "true" || process.env.INCOGNITO === "TRUE") {
        mySbMsg.incognito = true;
    } else {
        mySbMsg.incognito = false;
    }

    const customLogger = (str) => {
        // this ends up going to the console as well, assuming the mock of context.log logs to console!
        context.log(str);
    };

    try {
        return await cliSearch.searchWebsiteForAwards(mySbMsg, false, customLogger);
    } catch (err) {
        context.log('ERROR', err);
        throw err;
    }

    // TODO: do a nodejs HTTP Post after search is complete to post to the PushBullet API
};