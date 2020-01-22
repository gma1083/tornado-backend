const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Person = new ClassModel({
    className : 'Person',
    attributes : [
        {
            name : 'firstName',
            type : String,
            required : true
        },
        {
            name : 'lastName',
            type : String,
            required : true
        }
    ],
    relationships : [
        {
            name : 'contact',
            toClass : 'Contact',
            singular : true,
            required : true
        },
        {
            name : 'pac',
            toClass : 'PAC',
            singular : true,
            mirrorRelationship : 'person'
        },
        {
            name : 'roles',
            toClass : 'Role',
            singular : false,
            mirrorRelationship : 'people'
        }
    ],

});

module.exports = Person;
