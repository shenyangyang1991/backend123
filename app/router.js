'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/topics', controller.topics.index);
  router.post('/topics/:id/follow', controller.topics.follow);
  router.delete('/topics/:id/follow', controller.topics.unfollow);
  router.get('/topics/:id/posts', controller.posts.index);
  router.post('/topics/:id/posts', controller.posts.create);
  router.post('/posts/:id/like', controller.posts.like);
  router.delete('/posts/:id/like', controller.posts.dislike);
  router.post('/posts/:id/comments', controller.comments.create);
  router.get('/posts/:id/comments', controller.comments.index);
  router.post('/comments/:id/like', controller.comments.like);
  router.delete('/comments/:id/like', controller.comments.dislike);
  router.get('/users/:id', controller.users.show);
  router.put('/users', controller.users.update);
  router.post('/users', controller.users.create);
  router.get('/users', controller.users.index);
  router.get('/users/:id/wallet', controller.users.wallet);
};
