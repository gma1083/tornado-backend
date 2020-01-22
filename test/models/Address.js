const Address = require('../../source/models/Address');
const AddressType = require('../../source/models/AddressType');
const Noomman = require('noomman');
const Instance = Noomman.Instance;

describe('Address.js Class Tests:', () => {

    before(async () => {
        await Noomman.connect('mongodb+srv://GregArnheiter:GregArnheiter@cluster0-y8dyb.mongodb.net/test?retryWrites=true&w=majority', "tornado_test");
    });
    after(async () => {
        await Noomman.close();
    });

    describe('Address Validation Tests:', () => {

        it('address.validate() - All fields missing', async () => {

            const address = new Instance(Address);

            try {
                await address.validate();
            }
            catch(error) {
                if(error.message !== address.id + ': Missing required property(s): "streetNumber", "streetName", "city", "zip", "state", "country", "addressType"') throw error;
            }
        });

    });

    describe('Address Non Static Methods Tests:', () => {

        it('address.pretty() - Converts address to string with unit field', () => {

            const address = new Instance(Address);
            address.assign({
                streetNumber : 55,
                streetName : "De Luca Place",
                unit : "Suite B",
                city :  "San Rafael",
                state : "CA",
                zip : 94901,
                country : "USA"
            });

            const addressPretty = address.pretty();
            if(addressPretty !== '55 De Luca Place Suite B, San Rafael, CA, 94901, USA') throw new Error('Pretty did not convert address instance to proper string');

        });

        it('address.pretty() - Converts address to string without unit field', () => {

            const address = new Instance(Address);
            address.assign({
                streetNumber : 55,
                streetName : "De Luca Place",
                city :  "San Rafael",
                state : "CA",
                zip : 94901,
                country : "USA"
            });

            const addressPretty = address.pretty();
            if(addressPretty !== '55 De Luca Place, San Rafael, CA, 94901, USA') throw new Error('Pretty did not convert address instance to proper string');

        });

    });

});