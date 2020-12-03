const Router = require('koa-router');
const router = new Router();

const personController = require('./source/controllers/Person');
const Person = require('./source/models/Person');


router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
   });

router.post('/newPerson', async (ctx, next) => {
    const data = personController.packageRequest(ctx.request.body);
    const person = await personController.newPersonAndContact(data);
   
    ctx.body = JSON.stringify(person);

});

router.post('/Persons', async (ctx, next) => {
    const people = await Person.find({firstName : ctx.request.body.textField});
    const peopleArray = Array.from(people.map(i => i.toDocument()));
    console.log(peopleArray);
    ctx.body = JSON.stringify(peopleArray);
});


module.exports = router;