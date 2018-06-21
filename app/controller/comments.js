'use strict';

const Controller = require('egg').Controller;

class CommentsController extends Controller {
  async index() {
    this.ctx.body = 'hi, comments';
  }
  async create() {
    this.ctx.body = 'hi, create comments';
  }
  async like() {
    this.ctx.body = 'hi, like comments';
  }
  async dislike() {
    this.ctx.body = 'hi, dislike comments';
  }
}

module.exports = CommentsController;
