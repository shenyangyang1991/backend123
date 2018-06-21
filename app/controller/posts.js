'use strict';

const Controller = require('egg').Controller;

class PostsController extends Controller {
  async index() {
    this.ctx.body = 'hi, posts';
  }
  async create() {
    this.ctx.body = 'hi, create posts';
  }
  async like() {
    this.ctx.body = 'hi, like posts';
  }
  async dislike() {
    this.ctx.body = 'hi, dislike posts';
  }
}

module.exports = PostsController;
