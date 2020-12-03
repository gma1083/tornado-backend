

const noomman = require('noomman');
const Contact = require('./Contact');
const Job = require('./Job');
const ClassModel = noomman.ClassModel;
const NoommanErrors = noomman.NoommanErrors;
const InstanceSet = noomman.InstanceSet;

const Address = new ClassModel({
    className : 'Address',
    attributes : [
        {
            name : 'streetNumber',
            type : Number,
            required : true
        },
        {
            name : 'unit',
            type : String
        },
        {
            name : 'streetName',
            type : String,
            required : true
        },
        {
            name : 'city',
            type : String,
            required : true
        },
        {
            name : 'zip',
            type : Number,
            required : true
        },
        {
            name : 'state',
            type : String,
            required : true
        },
        {
            name : 'country',
            type : String,
            required : true
        }
    ],
    relationships : [
        {
            name : 'addressType',
            toClass : 'AddressType',
            singular : true,
            required : true
        }
    ],
    validations : [
        function() {
            if(String(this.zip).length !== 5) throw new NoommanErrors.NoommanValidationError('Zip code must be 5 characters only.');
        },
        function() {
            if(this.state.length !== 2) throw new NoommanErrors.NoommanValidationError('State must be 2 characters only.');
        },
    ],
    nonStaticMethods : {
        pretty : pretty,
        shouldDelete : shouldDelete
    }


});

function pretty() {
    if(this.unit) return this.streetNumber + ' ' + this.streetName + ' ' + this.unit + ', ' + this.city + ', ' + this.state + ', ' + this.zip + ', ' + this.country;
    else return this.streetNumber + ' ' + this.streetName + ', ' + this.city + ', ' + this.state + ', ' + this.zip + ', ' + this.country;
}

async function shouldDelete() {
  
    let shouldDelete = null;

    const linkedJobs = await Job.find({address : this._id});
    const foundContacts = await Contact.find({addresses : {$in : [this._id]} });
    
    if((!(linkedJobs.isEmpty())) ||  (!(foundContacts.isEmpty()))) shouldDelete = false;
    else shouldDelete = true;

    return shouldDelete;
}


module.exports = Address;