'use strict';

const Controller = require('egg').Controller;
const resultJson = require('../util/resultJson');

class UsersController extends Controller {
  async index() {
    this.ctx.body = 'hi, users';
  }
  async create() {
    // 登录
    const { ctx } = this;
    const rule = {
      code: {
        type: 'string',
      },
      info: {
        type: 'object',
      },
    };
    let respJson = {};

    try {
      ctx.validate(rule);
    } catch (error) {
      // error
      respJson = resultJson(false, {}, '系统错误, 请您及时联系我们');
      ctx.logger.error(error);
      this.ctx.status = respJson.status;
      this.ctx.body = respJson;
      return;
    }
    // 微信接口获取open_id
    let wxData = await ctx.service.user.getOpenIdByCode(ctx.request.body.code);
    if (wxData) {
      let info = ctx.request.body.info;
      let user = await ctx.service.user.sign('login', {
        open_id: wxData.openid,
        ...info,
      });
      if (user) {
        respJson = resultJson(true, user, '登录成功');
      } else {
        respJson = resultJson(true, {}, '登录失败, 请您重新尝试');
      }
    } else {
      // error
      respJson = resultJson(false, {}, '登录失败, 请您重新尝试');
    }
    this.ctx.status = respJson.status;
    this.ctx.body = respJson;
  }
  async show() {
    this.ctx.body = 'hi, show users';
  }
  async update() {
    const { ctx } = this;
    const rule = {
      user: {
        type: 'object',
      },
    };
    let respJson = {};

    try {
      ctx.validate(rule);
    } catch (error) {
      // error
      respJson = resultJson(false, {}, '系统错误, 请您及时联系我们');
      ctx.logger.error(error);
      this.ctx.status = respJson.status;
      this.ctx.body = respJson;
      return;
    }
    let user = ctx.request.body.user;
    if (user.open_id) {
      let newUser = await ctx.service.user.sign('update', user);
      if (newUser) {
        respJson = resultJson(true, {}, '更新成功');
      } else {
        respJson = resultJson(false, {}, '系统错误, 请您及时联系我们');
      }
    } else {
      respJson = resultJson(false, {}, '系统错误, 请您及时联系我们');
    }

    this.ctx.status = respJson.status;
    this.ctx.body = respJson;
  }
}

module.exports = UsersController;
