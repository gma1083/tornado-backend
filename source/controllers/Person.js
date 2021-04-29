const noomman = require('noomman');
const util = require('../utilities/util');
const Person = require('../models/Person');
const Contact = require('../models/Contact');
const Address = require('../models/Address');
const AddressType = require('../models/AddressType');
const { NoommanValidationError } = require('noomman/noomman/NoommanErrors');
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
        }
        
    }

    const contact = contactData.id ? await Contact.findById(contactData.id) : new Instance(Contact);
    contact.assign(contactData);

    const person = personData.id ? await Person.findById(personData.id) : new Instance(Person); 
    person.assign(personData);

    contact.addresses = addresses;
    person.contact = contact;

// Add await validation to each before saving - try catch there
    let errorProperties = [];
    try{
        await addresses.validate();
    }
    catch(error) {
        errorProperties = errorProperties.concat(error.properties);
        console.log(`Error Props: ${errorProperties}`);
    }
    try{
        await contact.validate();
    }
    catch(error) {
        console.log('ERROR CODY WANTS TO SEE: ' + error.message);
        errorProperties = errorProperties.concat(error.properties);
        console.log(`Error Props: ${errorProperties}`);
    }
    try{
        await person.validate();
    }
    catch(error) {
        errorProperties = errorProperties.concat(error.properties);
        console.log(`Error Props: ${errorProperties}`);
    }
    console.log(`Error Props ${errorProperties.length}`);
    if(errorProperties) {
    
        throw new NoommanValidationError("New Person Form Error", errorProperties);
    }

    await addresses.save();
    await contact.save();
    await person.save();

    const instances = [person, contact, addresses];
    // const response = {
    //     person : person.toDocument(),
    //     contact : contact.toDocument(),
    //     addresses
    // }
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

function packageRequest(body) {
    const data = {};
    data.addresses = [];

    const personData = body.person;
    const contactData = body.contact;
    const addressData = body.addresses;

    const castedContactData = util.castAttributes('Contact', contactData);

    for(address of addressData){
        const castedAddressData = util.castAttributes('Address', address);
        data.addresses.push(castedAddressData);
    }
    
    data.person = personData;
    data.contact = castedContactData;

    return data;
    
}

module.exports = {
    findAll,
    newPersonAndContact,
    editPersonAndContact,
    packageRequest,
};