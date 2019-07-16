const processSearchFn = require('./index');
const context = require('../testing/defaultContext');

test('Sample Search: AC, BRU to AKL, Business, One Way, 2 people', async () => {

    var request = {
        website: 'AC', 
        partners: true, 
        from: 'bru', 
        to: 'akl', 
        oneway: true, 
        cabin: 'business', 
        start: '2020-01-01', 
        end: '2020-01-15', 
        quantity: 2, 
        reverse: false
    };

    let result = await processSearchFn(context, request);

    //expect(context.log.mock.calls.length).toBe(1);
    //expect(context.res.body).toEqual('Searching for nrt to hnl');
    expect(result).toBe(true);
}, 600000);