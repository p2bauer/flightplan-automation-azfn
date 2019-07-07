const queueSearchFunction = require('./index');
const context = require('../testing/defaultContext');

test('Http trigger should return known text', async () => {

    const request = {
        query: { fromCity: 'nrt', toCity: 'hnl' }
    };

    await queueSearchFunction(context, request);

    expect(context.log.mock.calls.length).toBe(1);
    expect(context.res.body).toEqual('Searching for nrt to hnl');
});