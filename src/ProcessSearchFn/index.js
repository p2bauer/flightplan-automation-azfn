const fp = require('../flightplan/src');
const db = require('../flightplan/shared/db');
const logger = require('../flightplan/shared/logger');

module.exports = async function(context, mySbMsg) {
    context.log('JavaScript ServiceBus queue trigger function processed message', mySbMsg);

    try {
        // Open database
        console.log('Opening database...');
        db.open();
        console.log('Success!');
      } catch (err) {
        console.error(err);
    }

    // TODO: do a nodejs HTTP Post after search is complete to post to the PushBullet API

    
};