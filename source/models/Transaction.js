const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Transaction = new ClassModel({
    className : 'Transaction',
    attributes : [
        {
            name : 'date',
            type : Date,
            required : true,
        },
        {
            name : 'amount',
            type : Number,
            required : true,
        },
        {
            name : 'referenceNumber',
            type : Number,
            required : false,
        },
        {
            name : 'memo',
            type : String,
            required : false,
        }
    ],
    relationships : [
        {
            name : 'job',
            toClass : 'Job',
            singular : false
        },
        {
            name : 'employee',
            toClass : 'Employee',
            singular : true
        }
    ]
  
});

module.exports = Transaction;