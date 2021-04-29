const noomman = require('noomman');
const ClassModel = noomman.ClassModel;


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
    castAttributes,
};