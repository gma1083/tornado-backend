const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Role = new ClassModel({
    className : 'Role',
    relationships : [
        {
            name : 'roleDescription',
            toClass : 'RoleDescription',
            singular : true,
            required : true
        },
        {
            name : 'people',
            toClass : 'person',
            singular : false,
            mirrorRelationship : 'role'
        }
    ]
  
});

module.exports = Role;