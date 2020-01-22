const Noomman = require('noomman');
const Instance = Noomman.Instance;
const Contact = require('../../source/models/Contact');

describe('Contact.js Class Tests:', () => {

    before(async () => {
        await Noomman.connect('mongodb+srv://GregArnheiter:GregArnheiter@cluster0-y8dyb.mongodb.net/test?retryWrites=true&w=majority', "tornado_test");
    });
    after(async () => {
        await Noomman.close();
    });


    describe('Contact Validation Functions', () => {

        it('contact.validate() - Required fields missing', async () => {
            const contact = new Instance(Contact);
            try {
                await contact.validate();
            }
            catch(error) {
                if(error.message !== contact.id + ': Missing required property(s): "email", "primaryPhone"') throw error;
            }
        });

        it('contact.validate() - Invalid Primary Phone Values', async () => {
            const contact = new Instance(Contact);
            contact.assign({
                primaryPhone : 8972485,
                mobile : 4152507669,
                fax : 4154563404,
                email : 'something@something.com'
            });

            try {
                await contact.validate();
            }
            catch(error) {
                if(error.message !== contact.id + ': Primary Phone Number Must Be Exactly 10 Digits') throw error;
            }
        });

        it('contact.validate() - Invalid Mobile Phone Values', async () => {
            const contact = new Instance(Contact);
            contact.assign({
                primaryPhone : 4158972485,
                mobile : 2507669,
                fax : 4154563404,
                email : 'something@something.com'
            });

            try {
                await contact.validate();
            }
            catch(error) {
                if(error.message !== contact.id + ': Mobile Phone Number Must Be Exactly 10 Digits') throw error;
            }
        });

        it('contact.validate() - Invalid Fax Values', async () => {
            const contact = new Instance(Contact);
            contact.assign({
                primaryPhone : 4158972485,
                mobile : 4152507669,
                fax : 4563404,
                email : 'something@something.com'
            });

            try {
                await contact.validate();
            }
            catch(error) {
                if(error.message !== contact.id + ': Fax Number Must Be Exactly 10 Digits') throw error;
            }
        });

        it('contact.validate() - Invalid Email Values', async () => {
            const contact = new Instance(Contact);
            contact.assign({
                primaryPhone : 4158972485,
                mobile : 4152507669,
                fax : 4154563404,
                email : 'something@something'
            });

            try {
                await contact.validate();
            }
            catch(error) {
                if(error.message !== contact.id + ': Invalid Email') throw error;
            }
        });

        it('contact.validate() - All Fields Valid', async () => {
            const contact = new Instance(Contact);
            contact.assign({
                primaryPhone : 4158972485,
                mobile : 4152507669,
                fax : 4154563404,
                email : 'something@something.com'
            });

            try {
                await contact.validate();
            }
            catch(error) {
                throw error;
            }
        });

    });

});