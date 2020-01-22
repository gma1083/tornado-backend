const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Employee = new ClassModel({
    className : 'Employee',
    attributes : [
        {
            name : 'number',
            type : Number,
            required : true,
            unique : true
        },
        {
            name : 'hireDate',
            type : Date,
            required : true,
        },
        {
            name : 'rate',
            type : Number,
            required : true
        }
    ],
    relationships : [
        {
            name : 'person',
            toClass : 'Person',
            singular : true
        }
    ]

});

module.exports = Employee;
