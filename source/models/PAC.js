const noomman = require('noomman');
const ClassModel = noomman.ClassModel;
const Client = require('./Client');

const PAC = new ClassModel({
    className : 'PAC',
    superClasses : [Client],
    relationships : [
        {
            name : 'person',
            toClass : 'Person',
            singular : true,
            mirrorRelationship : 'pac',
            required : true
        }
    ]

});

module.exports = PAC;