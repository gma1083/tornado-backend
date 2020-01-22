const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Class = new ClassModel({
    className : 'Class',
    attributes : [
        {
            name : '',
            type : Type,
            required : true,
        }
    ]
  
});

module.exports = Class;