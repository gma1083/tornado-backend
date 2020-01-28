const Router = require('koa-router');
const router = new Router();

const personController = require('./source/controllers/Person');


router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
   });

router.post('/newPerson', async (ctx, next) => {
    const data = personController.packageRequest(ctx.request.body);
    const person = await personController.newPersonAndContact(data);
   
    ctx.body = JSON.stringify(person);

});


module.exports = router;