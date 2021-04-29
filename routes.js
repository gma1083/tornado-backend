const Router = require('koa-router');
const router = new Router();

// Controller Requirements
const addressController = require('./source/controllers/Address');
const personController = require('./source/controllers/Person');
const timesheetController = require('./source/controllers/Timesheet');

// Model Requirements
const Address = require('./source/models/Address');
const AddressType = require('./source/models/AddressType');
const Budget = require('./source/models/Budget');
const Client = require('./source/models/Client');
const Company = require('./source/models/Company');
const Contact = require('./source/models/Contact');
const Employee = require('./source/models/Employee');
const Invoice = require('./source/models/Invoice');
const Job = require('./source/models/Job');
const JobRate = require('./source/models/JobRate');
const PAC = require('./source/models/PAC');
const Person = require('./source/models/Person');
const Rate = require('./source/models/Rate');
const Role = require('./source/models/Role');
const RoleDescription = require('./source/models/RoleDescription');
const Timesheet = require('./source/models/Timesheet');
const Transaction = require('./source/models/Transaction');

/*******************************
        ALL ROUTES BELOW
********************************/

//-----------------------------------
// Static Site Info Pages
//-----------------------------------


// Home Page
router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
   });


//-----------------------------------
// Routes For Viewing Database Tables
//-----------------------------------

// // Returns List Of All Persons
// router.post('/Persons', async (ctx, next) => {
//     const people = await Person.find({firstName : ctx.request.body.textField});
//     const peopleArray = Array.from(people.map(i => i.toDocument()));
//     console.log(peopleArray);
//     ctx.body = JSON.stringify(peopleArray);
// });

// Returns List Of All Persons
router.get('/Persons', async (ctx, next) => {
    const persons = await personController.findAll();
    const personsArray = Array.from(persons.map(i => i.toDocument()));
    ctx.body = JSON.stringify(personsArray);
});

// Returns List Of All Timesheets
router.get('/Timesheets', async (ctx, next) => {
    const timeSheets = await timesheetController.findAll();
    const timeSheetsArray = Array.from(timeSheets.map(i => i.toDocument()));
    ctx.body = JSON.stringify(timeSheetsArray);
});


//-----------------------------
// Routes For Form Submissions
//-----------------------------

// New Address Form
//  - Saves one Address
router.post('/newAddress', async (ctx, next) => {
    const data = addressController.packageRequest(ctx.request.body);
    const address = await addressController.newAddress(data);
    ctx.body = JSON.stringify(address);
});

// New Person Form
//  - Saves one Person, one Contact, and multiple Address
router.post('/newPerson', async (ctx, next) => {
    console.dir(ctx.request.body);
    const data = personController.packageRequest(ctx.request.body);
    const person = await personController.newPersonAndContact(data);
    ctx.body = JSON.stringify(person);
});

// New Timesheet Form
// - Saves one timesheet
router.post('/newTimesheet', async (ctx, next) => {
    const data = timesheetController.packageRequest(ctx.request.body);
    const timesheet = await timesheetController.newTimesheet(data);
    ctx.body = JSON.stringify(timesheet.toDocument());
});

// Exports
module.exports = router;