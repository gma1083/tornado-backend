const Noomman = require('noomman');
const Instance = Noomman.Instance;

describe('Testing Template', () => {

    before(async () => {
        await Noomman.connect('mongodb+srv://GregArnheiter:GregArnheiter@cluster0-y8dyb.mongodb.net/test?retryWrites=true&w=majority', "tornado_test");
    });
    after(async () => {
        await Noomman.close();
    });


    describe('First Test Batch:', () => {

        it('First Test', async () => {


            //First Test Here


        });

    });

});