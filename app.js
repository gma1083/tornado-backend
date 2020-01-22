const Koa = require('koa');
const logger = require('koa-logger');
const routes = require('./routes');
const app = new Koa();
app.use(logger());

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
app.listen(3000);