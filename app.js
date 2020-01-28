const Koa = require('koa');
const bodyParser = require('koa-body')()
const logger = require('koa-logger');
const routes = require('./routes');
const Noomman = require('noomman');
const cors = require('@koa/cors');


require('./source/models/index');

Noomman.connect('mongodb+srv://GregArnheiter:GregArnheiter@cluster0-y8dyb.mongodb.net/test?retryWrites=true&w=majority', "tornado_test")
    .then(() => console.log('Connected....'))
    .catch((error) => console.log('Connection Failed: ' + error.message));

const app = new Koa();
app.use(logger());
app.use(cors());
app.use(bodyParser);
app.use(routes.routes());
app.use(routes.allowedMethods());
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
    }
   });
app.listen(8000);