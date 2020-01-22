const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Invoice = new ClassModel({
    className : 'Invoice',
    attributes : [
        {
            name : 'date',
            type : Date,
            required : true
        },
        {
            name : 'number',
            type : Number,
            required : true
        },
        {
            name : 'amount',
            type : Number,
            required : true
        },
    ],
    relationships : [
        {
            name : 'job',
            toClass : 'Job',
            singular : true,
            mirrorRelationship : 'invoices'
        },
        {
            name : 'transaction',
            toClass : 'Transaction',
            singular : true
        }
    ]

    
});

module.export = Invoice;
