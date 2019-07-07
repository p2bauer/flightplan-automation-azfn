//const cliSearch = require('../flightplan/bin/cli-search');

module.exports = async function(context, mySbMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);

    // try {
    //     // Open database
    //     console.log('Opening database...');
    //     await db.open();
    //     console.log('Success!');
    //   } catch (err) {
    //     console.error(err);
    // }

    //await cliSearch.main(mySbMsg);



    // TODO: do a nodejs HTTP Post after search is complete to post to the PushBullet API

    
};