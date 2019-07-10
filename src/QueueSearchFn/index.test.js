const queueSearchFunction = require('./index');
const context = require('../testing/defaultContext');

test('Http trigger should return known text', async () => {

    const request = {
        query: { 
            fromCity: 'nrt', 
            toCity: 'hnl', 
            start: '2020-01-01', 
            end: '2020-01-02', 
            quantity: 2
        }
    };

    await queueSearchFunction(context, request);

    // TODO: don't test logs, test something more useful!
    expect(context.log.mock.calls.length).toBe(2);

    expect(context.res.body).toEqual('Searching for ' + request.query.fromCity + ' to ' + request.query.toCity + 
        ' from ' + request.query.start + ' to ' + request.query.end + ' for ' + request.query.quantity + ' person(s)');
});