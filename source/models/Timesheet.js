const noomman = require('noomman');
const ClassModel = noomman.ClassModel;
const Transaction = require('./Transaction');

const Timesheet = new ClassModel({
    className : 'Timesheet',
    superClasses : [Transaction],
    attributes : [
        {
            name : 'crew',
            type : Number,
            required : true,
        },
        {
            name : 'hours',
            type : Number,
            required : true,
        },{
            name : 'lunch',
            type : Boolean,
            required : true,
        },{
            name : 'finished',
            type : Boolean,
            required : true,
        },{
            name : 'offHauled',
            type : Boolean,
            required : true,
        },{
            name : 'yardsHauled',
            type : Number,
            required : true,
        },{
            name : 'typeHauled',
            type : String,
            required : true,
        },{
            name : 'notes',
            type : String,
            required : true,
        },
    ]
  
});

module.exports = Timesheet;