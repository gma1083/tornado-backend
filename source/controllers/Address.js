const noomman = require('noomman');
const util = require('../utilities/util');
const Person = require('../models/Person');
const Contact = require('../models/Contact');
const Address = require('../models/Address');
const AddressType = require('../models/AddressType');
const Instance = noomman.Instance;

async function findAll() {
    return Array.from(await Adddress.find({}));
}

async function newAddress(data) {
    const addressData = data.address;
    const addressTypeData = data.addressType;

    const addressType = await AddressType.findOne({type : addressTypeData.type});
    const address = addressData.id ? await Address.findById(addressData.id) : new Instance(Address);
    address.assign(addressData);
    address.addressType = addressType;

    try {
        await address.validate();
    }
    catch(error) {
        console.log('Validation Error - Address controller - newAddress');
        console.log(error);
    }

    await address.save();
}

function packageRequest(body) {
    const data = {};
    const addressData = body.address;

    const castedAddress = util.castAttributes('Address', addressData);

    data.address = castedAddress;
    data.addressType = body.addressType;

    return data;
    
}

module.exports = {
    findAll,
    newAddress,
    packageRequest,
};