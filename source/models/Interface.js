const noomman = require('noomman');
const ClassModel = noomman.ClassModel;

const Interface = new ClassModel({
    className : 'Interface',
    abstract: true,

    nonStaticMethods : {
        create,
    }

    async function create(data) {

    }
  
});

module.exports = Class;