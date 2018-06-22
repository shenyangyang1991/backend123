'use strict';

const Controller = require('egg').Controller;

class TopicsController extends Controller {
  async index() {
    const { ctx } = this;
    // const rule = {
    //   name: {
    //     type: 'string'
    //   },
    //   page: {
    //     type: 'number'
    //   }
    // };

    // try {
    //   ctx.validate(rule, ctx.query);
    // } catch (err) {
    //   ctx.logger.warn(err.errors);
    //   ctx.body = { success: false };
    //   return;
    // }

    ctx.model.Topic.findList();
    ctx.body = 'hi, topic';
  }
  async follow() {
    const { ctx } = this;
    const rule = {
      id: {
        type: 'string'
      }
    };

    ctx.validate(rule, ctx.params);
    this.ctx.body = 'hi, follow topic';
  }
  async unfollow() {
    const { ctx } = this;
    const rule = {
      id: {
        type: 'string'
      }
    };

    ctx.validate(rule, ctx.params);
    this.ctx.body = 'hi, unfollow topic';
  }
}

module.exports = TopicsController;
