const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Job = new ClassModel({
    className : 'Job',
    attributes : [
        { 
            name : 'number',
            type : Number,
            required : true
        }
    ],
    relationships : [
        {
            name : 'jobRate',
            toClass : 'JobRate',
            singular : false,
            required : true
        },
        {
            name : 'address',
            toClass : 'Address',
            singular : true,
            required : true
        },
        {
            name : 'client',
            toClass : 'Client',
            singular : true,
            required : true
        },
        {
            name : 'role',
            toClass : 'Role',
            singular : false,
            required : true
        },
        {
            name : 'transaction',
            toClass : 'Transaction',
            singular : false,
            required : false
        },
        {
            name : 'budget',
            toClass : 'Budget',
            singular : true,
            required : true,
            owns : true
        },
    ]

});

module.exports = Job;