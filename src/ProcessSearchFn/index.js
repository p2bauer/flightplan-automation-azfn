const cliSearch = require('../flightplan/shared/search');

module.exports = async function(context, mySbMsg) {
    context.log.info('JavaScript ServiceBus queue trigger function processed message', mySbMsg);

    mySbMsg.headless = true;
    mySbMsg.proxy = "";
    mySbMsg.docker = false;

    var credentialsOverride = process.env.ACCOUNTS;

    try {
        await cliSearch.doSearch(mySbMsg, credentialsOverride, false);
    } catch (err) {
        context.log.error('ERROR', err);
        throw err;
    }

    // TODO: do a nodejs HTTP Post after search is complete to post to the PushBullet API
};