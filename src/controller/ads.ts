import {BaseContext} from 'koa';
import {getManager, Repository, Not, Equal} from 'typeorm';

export default class AdsController {
  public static async get(ctx: BaseContext) {
    ctx.status = 200;
    ctx.body = 'haha';
  }
}
