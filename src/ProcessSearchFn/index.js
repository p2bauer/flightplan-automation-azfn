const cliSearch = require('../flightplan/shared/search');

module.exports = async function(context, mySbMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);

    mySbMsg.headless = true;
    mySbMsg.proxy = "";
    mySbMsg.docker = true;
    mySbMsg.remotechrome = process.env.REMOTECHROME;
    mySbMsg.credentials = process.env.ACCOUNTS;

    const customLogger = (str) => {
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