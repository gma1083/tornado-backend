

const noomman = require('noomman');
const ClassModel = noomman.ClassModel;
const NoommanErrors = noomman.NoommanErrors;

const Contact = new ClassModel({
    className : 'Contact',
    attributes : [
        {
            name : 'email',
            type : String,
            required : true
        },
        {
            name : 'primaryPhone',
            type : Number,
            required : true
        },
        {
            name : 'fax',
            type : Number,
        },
        {
            name : 'mobile',
            type : Number
        },
        {
            name : 'website',
            type : String
        }
    ],
    relationships : [
        {
            name : 'addresses',
            toClass : 'Address',
            singular : false
        }
    ],
    validations : [
        function() {
            if(String(this.primaryPhone).length !== 10) throw new NoommanErrors.NoommanValidationError('Primary Phone Number Must Be Exactly 10 Digits', ["primaryPhone"]);
        },
        function() {
            if(this.fax){
                if(String(this.fax).length !== 10) throw new NoommanErrors.NoommanValidationError('Fax Number Must Be Exactly 10 Digits', ['fax']);
            }
            
        },
        function() {
            if(this.mobile) {
                if(String(this.mobile).length !== 10) throw new NoommanErrors.NoommanValidationError('Mobile Phone Number Must Be Exactly 10 Digits', ['mobilePhone']);
            }
            
        },
        function() {
            if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(this.email) == false) {
                throw new NoommanErrors.NoommanValidationError('Invalid Email', ['email']);
            }
        }
    ]




});

module.exports = Contact;