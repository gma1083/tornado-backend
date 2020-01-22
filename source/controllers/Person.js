const noomman = require('noomman');
const Person = require('../models/Person');
const Contact = require('../models/Contact');
const Address = require('../models/Address');
const AddressType = require('../models/AddressType');
const Instance = noomman.Instance;
const InstanceSet = noomman.InstanceSet;

async function findAll() {
    return Array.from(await Person.find({}));
}



async function newPersonAndContact(data) {
    const addressesData = data.addresses;
    const contactData = data.contact;
    const personData = data.person;

    const addresses = new InstanceSet(Address);

    for(const address in addressesData) {

        const tempAddressType = await AddressType.findOne({type : addressesData[address].addressType.type});

        if(addressesData[address].id) {
            const oldAddress = await Address.findById(addressesData[address].id);
            addressesData[address].addressType = tempAddressType;
            oldAddress.assign(addressesData[address]);
            addresses.add(oldAddress);
        }
        else {
            const newAddress = new Instance(Address);
            addressesData[address].addressType = tempAddressType;
            newAddress.assign(addressesData[address]);
            addresses.add(newAddress);
            newAddress.save();
        }
        
    }

    const contact = contactData.id ? await Contact.findById(contactData.id) : new Instance(Contact);
    const person = personData.id ? await Person.findById(personData.id) : new Instance(Person); 

    contact.assign(contactData);
    person.assign(personData);

    contact.addresses = addresses;
    person.contact = contact;

    await contact.save();
    await person.save();

    const instances = [person, contact, addresses];
    return instances;
    
}


async function editPersonAndContact(personData) {
    if(personData._id) {
        const person = await Person.findById(personData._id);
        person.assign(personData);
        await person.save();
    }
    else{
        const person = new Instance(Person);
        person.assign(personData);
        await person.save();
    }  
}




module.exports = {
    findAll,
    newPersonAndContact,
    editPersonAndContact
};