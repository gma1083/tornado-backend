const Address = require('../../source/models/Address');
const AddressType = require('../../source/models/AddressType');
const Noomman = require('noomman');
const Instance = Noomman.Instance;

describe('AddressType.js Class Tests:', () => {

    before(async () => {
        await Noomman.connect('mongodb+srv://GregArnheiter:GregArnheiter@cluster0-y8dyb.mongodb.net/test?retryWrites=true&w=majority', "tornado_test");
    });
    after(async () => {
        await Noomman.close();
    });

    describe('Address Validation Tests:', () => {

        it('address.validate() - All fields missing', async () => {

            const addressType = new Instance(AddressType);

            try {
                await addressType.validate();
            }
            catch(error) {
                if(error.message !== addressType.id + ': Missing required property(s): "type"') throw error;
            }
        });

    });

    describe('Address Non Static Methods Tests:', () => {

        it('Save Instance of AddressType', async () => {
            const addressType = new Instance(AddressType);
            addressType.type = 'Home';
            await addressType.save();

        });

    });

});