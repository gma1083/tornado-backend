const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Rate = new ClassModel({
    className : 'Rate',
    attributes : [
        {
            name : 'foreman',
            type : Number,
            required : true
        },
        {
            name : 'crew',
            type : Number,
            required : true
        },
        {
            name : 'laborCost',
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
        }
    ]
    
});

module.exports = Rate;
