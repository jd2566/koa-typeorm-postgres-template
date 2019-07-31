import Router from 'koa-router';
import * as controller from '../controller';

const protectedRouter = new Router();

protectedRouter.get('/adss', controller.ads.get);

export {protectedRouter};
