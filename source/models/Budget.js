const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Budget = new ClassModel({
    className : 'Budget',
    attributes : [
        {
            name : 'hours',
            type : Number,
            required : true
        },
        {
            name : 'dump',
            type : Number,
            required : true
        },
        {
            name : 'other',
            type : Number,
            required : true
        }
    ],
    relationships : [
        {
            name : 'job',
            toClass : 'Job',
            singular : true,
            required : true
        }
    ]

    
});

module.exports = Budget;
