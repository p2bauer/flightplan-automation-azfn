const cliSearch = require('../flightplan/shared/search');

module.exports = async function(context, mySbMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);

    mySbMsg.headless = true;
    mySbMsg.proxy = "";
    mySbMsg.docker = false;

    var credentialsOverride = process.env.ACCOUNTS;

    await cliSearch.doSearch(mySbMsg, credentialsOverride);

    // TODO: do a nodejs HTTP Post after search is complete to post to the PushBullet API
};