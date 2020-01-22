const noomman = require('noomman');
const ClassModel = noomman.ClassModel;
const NoommanErrors = noomman.NoommanErrors;

const AddressType = new ClassModel({
    className : 'AddressType',
    attributes : [
        {
            name : 'type',
            type : String,
            required : true
        }
    ],
    validations : [
        function () {
            //if((this.type !== 'Home') || (this.type !== 'Work') || (this.type !== 'Other')) throw new NoommanErrors.NoommanValidationError('AddressType must be either: "Home", "Work", or "Other"');
        }
    ]
  
});

module.exports = AddressType;