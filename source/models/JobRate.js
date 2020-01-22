const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const JobRate = new ClassModel({
    className : 'JobRate',
    attributes : [
        {
            name : 'startDate',
            type : Date,
            required : true
        },
        {
            name : 'endDate',
            type : Date,
            required : true
        }
    ],
    relationships : [
        {
            name : 'job',
            toClass : 'Job',
            singular : true,
            required : true
        },
        {
            name : 'rate',
            toClass : 'Rate',
            singular : true,
            required : true
        }
    ]

});

module.exports = JobRate;