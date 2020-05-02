const { Router } = require('express');
const multipart = require('connect-multiparty');
const articleController = require('./controllers/Article.controller');

const routes = Router();
const userController = require('./controllers/User.controller');

const multipartMiddleware = multipart();

routes.get('/articles', articleController.getAll);
routes.post('/article', multipartMiddleware, articleController.addArticle);
routes.get('/article/:id', articleController.getArticle);
routes.post('/article/clap', articleController.clapArticle);
routes.post('/article/comment', articleController.commentArticle);

routes.post('/user', userController.addUser);
routes.get('/user/:id', userController.getUser);
routes.get('/user/profile/:id', userController.getUserProfile);
routes.post('/user/follow', userController.followUser);

module.exports = routes;
