const noomman = require('noomman');
const Person = require('../models/Person');
const Contact = require('../models/Contact');
const Address = require('../models/Address');
const AddressType = require('../models/AddressType');
const ClassModel = noomman.ClassModel;
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
    contact.assign(contactData);

    const person = personData.id ? await Person.findById(personData.id) : new Instance(Person); 
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

function packageRequest(body) {
    const data = {};
    data.addresses = [];

    const personData = body.person;
    const contactData = body.contact;
    const addressData = body.addresses;

    const castedContactData = castAttributes('Contact', contactData);

    for(address of addressData){
        const castedAddressData = castAttributes('Address', address);
        data.addresses.push(castedAddressData);
    }
    
    data.person = personData;
    data.contact = castedContactData;

    return data;
    
}

function castAttributes(className, data) {
    const classModel = ClassModel.getClassModel(className);
    const classAttributes = classModel.attributes;
    const newData = {};
    Object.assign(newData, data);

    for(attribute of classAttributes) {
        switch(attribute.type) {
            case Number :
                newData[attribute.name] ? newData[attribute.name] = Number(newData[attribute.name]) : newData[attribute.name] = null;
                break;
            case Date :
                newData[attribute.name] ? newData[attribute.name] = Date(newData[attribute.name]) : newData[attribute.name] = null;
                break;
            case Boolean :
                newData[attribute.name] ? newData[attribute.name] = Boolean(newData[attribute.name]) : newData[attribute.name] = null;
                break;
            default :
                break;
        }
    }

    return newData;
}


module.exports = {
    findAll,
    newPersonAndContact,
    editPersonAndContact,
    castAttributes,
    packageRequest,
};