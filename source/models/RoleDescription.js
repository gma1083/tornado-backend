const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const RoleDescription = new ClassModel({
    className : 'RoleDescription',
    attributes : [
        {
            name : 'bids',
            type : String,
            required : false,
        },
        {
            name : 'projectManager',
            type : String,
            required : false,
        },
        {
            name : 'accountsPayable',
            type : String,
            required : false,
        },
        {
            name : 'accountsReceivable',
            type : String,
            required : false,
        },
        {
            name : 'owner',
            type : String,
            required : false,
        }
    ],
    relationships : [
        {
            name : 'role',
            toClass : 'Role',
            singular : true,
            required : true
        }
    ]
  
});

module.exports = RoleDescription;