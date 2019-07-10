const queueSearchFunction = require('./index');
const context = require('../testing/defaultContext');

test('Request should be successfully be queued up', async () => {

    const request = {
        query: { 
            website: 'fake', 
            includePartners: true, 
            fromCity: 'nrt', 
            toCity: 'hnl', 
            oneWay: false, 
            cabin: 'business', 
            start: '2020-01-01', 
            end: '2020-01-02', 
            quantity: 2, 
            searchdays: 10
        }
    };

    await queueSearchFunction(context, request);

    // TODO: don't test logs, test something more useful!
    expect(context.log.mock.calls.length).toBe(2);

    expect(context.res.body).toEqual('Searching for ' + request.query.fromCity + ' to ' + request.query.toCity + 
        ' from ' + request.query.start + ' to ' + request.query.end + ' for ' + request.query.quantity + ' person(s)');

    // since we're only asking for 2 days, but set to search for 
    //  10 days at a time, there should only be 1 request queued up
    expect(context.bindings.outputSbQueue.length).toBe(1);

    expect(context.bindings.outputSbQueue[0]).toBe({
        website: request.query.website, 
        partners: request.query.includePartners, 
        from: request.query.fromCity, 
        to: request.query.toCity, 
        oneway: request.query.oneWay, 
        cabin: request.query.cabin, 
        start: request.query.start, 
        end: request.query.end, 
        quantity: request.query.quantity, 
        reverse: false
    });
});