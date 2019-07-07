//const processSearchFn = require('./index');
const context = require('../testing/defaultContext');

test('rename me!', async () => {

    var website = 'AC';
    var includePartners = true;
    var fromCity = 'nrt';
    var toCity = 'hnl';
    var oneWay = false;
    var cabin = 'business';
    var start = '2020-01-01';
    var end = '2020-07-01';
    var quantity = 2;
    var reverse = false;

    var jsonStr = {
                        "website": + website, 
                        "partners": includePartners, 
                        "from": fromCity, 
                        "to": toCity, 
                        "oneway": oneWay, 
                        "cabin": cabin, 
                        "start": start, 
                        "end": end, 
                        "quantity": quantity, 
                        "reverse": reverse 
                 };

    // await processSearchFn(context, jsonStr);

    // //expect(context.log.mock.calls.length).toBe(1);
    // //expect(context.res.body).toEqual('Searching for nrt to hnl');
    // expect(true);
});