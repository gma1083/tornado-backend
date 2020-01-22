const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Client = new ClassModel({
    className : 'Client',
    abstract : true,
    relationships : [
        {
            name : 'jobs',
            toClass : 'Job',
            singular : false,
            mirrorRelationship : 'client'
        },
        {
            name : 'roles',
            toClass : 'Role',
            singular : false,
            mirrorRelationship : 'client'
        }
    ]
    
});

module.exports = Client;
