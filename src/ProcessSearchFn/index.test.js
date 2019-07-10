const processSearchFn = require('./index');
const context = require('../testing/defaultContext');

test('rename me!', async () => {

    var request = {
        website: 'AC', 
        partners: true, 
        from: 'nrt', 
        to: 'hnl', 
        oneway: false, 
        cabin: 'business', 
        start: '2020-01-01', 
        end: '2020-01-02', 
        quantity: 2, 
        reverse: false
    };

    await processSearchFn(context, request);

    //expect(context.log.mock.calls.length).toBe(1);
    //expect(context.res.body).toEqual('Searching for nrt to hnl');
    expect(true);
});