const index = require('../../source/models/index');
const PersonController = require('../../source/controllers/Person');
const Person = require('../../source/models/Person');
const Contact = require('../../source/models/Contact');
const Address = require('../../source/models/Address');
const AddressType = require('../../source/models/AddressType');
const Noomman = require('noomman');
const Instance = Noomman.Instance;
const InstanceSet = Noomman.InstanceSet;
const ClassModel = Noomman.ClassModel;

describe('Person Controller Tests:', () => {

    before(async () => {
        await Noomman.connect('mongodb+srv://GregArnheiter:GregArnheiter@cluster0-y8dyb.mongodb.net/test?retryWrites=true&w=majority', "tornado_test");
    });
    after(async () => {
        await Noomman.close();
    });

    describe('Person Controller - FindAll() Tests:', () => {

        beforeEach(async () => {
            await Person.clear();
        });

        it('FindAll() - Returns All Instance In Person Collection', async () => {

            const address1Type = new Instance(AddressType);
            const address1 = new Instance(Address);
            const contact1 = new Instance(Contact);
            const person1 = new Instance(Person);

            address1Type.type = 'Home';

            address1.streetNumber = 1007;
            address1.streetName = 'Mountain Drive';
            address1.city = 'Gotham City';
            address1.state = 'IL';
            address1.zip = 60035;
            address1.country = 'United States';
            
            contact1.email = 'bruce@batman.com';
            contact1.primaryPhone = 5559991111;

            person1.firstName = 'Bruce';
            person1.lastName = 'Wayne';

            address1.addressType = address1Type;
            contact1.addresses = new InstanceSet(Address, [address1]);
            person1.contact = contact1;

            await person1.save();

            const foundPeople = await PersonController.findAll();
            if(foundPeople.length !== 1 && foundPeople.hasInstance(person1)) throw new Error('PersonControll.findAll() Should have returned 1');
        });

    });

    describe('Person Controller - newPersonAndContact() Tests', () => {

        beforeEach(async () => {
            await Person.clear();
        });
        
        it('newPersonAndAdress() - Saves New Person, Contact, and Address', async () => {

            const personData = {
                person : {
                    firstName : 'Bruce',
                    lastName : 'Wayne'
                },
                contact : {
                    email : 'bruce@batman.com',
                    primaryPhone : 5559991111
                },
                addresses : [
                    {
                    streetNumber : 1007,
                    streetName : 'Mountain Drive',
                    city : 'Gotham City',
                    state : 'IL',
                    zip : 60035,
                    country : 'USA',
                    addressType : 
                        {
                            type : 'Home'
                        }
                    }
                ]
            };

            const savedResult = await PersonController.newPersonAndContact(personData);

            const foundPerson = await Person.findById(savedResult[0]._id);
            const foundContact = await Contact.findById(savedResult[1]._id);
            const foundAddress = await Address.findById(savedResult[2]._id);

            if(!foundPerson && !foundContact && !foundAddress) throw new Error('newPersonAndAddress Failed');


        });

    });

    describe('Cody Showing Greg Some Stuff', () => {

        it('First things first', async () => {

            const addressData = {
                    streetNumber : "1007",
                    streetName : 'Spider Drive',
                    city : 'Brookyln',
                    state : 'NY',
                    zip : "60035",
                    country : 'USA',
                    addressType : 
                        {
                            type : 'Home'
                        }
                };

            const data = PersonController.castAttributes("Address", addressData);


        });

    });


});
