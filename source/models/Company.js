const noomman = require('noomman');
const ClassModel = noomman.ClassModel;
const Client = require('./Client');

const Company = new ClassModel({
    className : 'Company',
    superClasses : [Client],
    attributes : [
        {
            name : 'name',
            type : String,
            required : true,
        }
    ],
    relationships : [
        {
            name : 'contact',
            toClass : 'Contact',
            singular : false,
            required : true
        }
    ]

});

module.exports = Company;