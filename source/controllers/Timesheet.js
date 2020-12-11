const noomman = require('noomman');
const Timesheet = require('../models/Timesheet');
const ClassModel = noomman.ClassModel;
const Instance = noomman.Instance;

async function findAll() {
    return Array.from(await Timesheet.find({}));
}

async function newTimesheet(data) {
    const timesheet = new Instance(Timesheet);
    timesheet.assign(data.timesheet);
    await timesheet.save();
    return timesheet;
    
}

async function editTimesheet(timesheetData) {
    if(timesheetData._id) {
        const timesheet = await Timesheet.findById(timesheetData._id);
        timesheet.assign(timesheetData);
        await timesheet.save();
    }
    else{
        const timesheet = new Instance(Timesheet);
        timesheet.assign(timesheetData);
        await timesheet.save();
    }  
}

function packageRequest(body) {
    
    const data = {};
    const timesheetData = body.timesheet;
    const castedTimesheetData = castAttributes('Timesheet', timesheetData);  
    data.timesheet = castedTimesheetData;

    return data;
    
}

function castAttributes(className, data) {
    const classModel = ClassModel.getClassModel(className);
    const classAttributes = classModel.attributes;
    const newData = {};

    Object.assign(newData, data);

    for(attribute of classAttributes) {
        switch(attribute.type) {
            case Number :
                newData[attribute.name] ? newData[attribute.name] = Number(newData[attribute.name]) : newData[attribute.name] = null;
                break;
            case Date :
                newData[attribute.name] ? newData[attribute.name] = new Date(newData[attribute.name]) : newData[attribute.name] = null;
                break;
            case Boolean :
                newData[attribute.name] ? newData[attribute.name] = Boolean(newData[attribute.name]) : newData[attribute.name] = null;
                break;
            default :
                break;
        }
    }

    return newData;
}


module.exports = {
    findAll,
    newTimesheet,
    editTimesheet,
    castAttributes,
    packageRequest,
};