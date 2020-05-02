const User = require('../models/User.schema');
const Article = require('../models/Article.schema');

module.exports = {
  addUser: (req, res, next) => {
    new User(req.body).save((err, newUser) => {
      if (err) res.send(err);
      else if (!newUser) res.send(400);
      else res.send(newUser);
      next();
    });
  },

  getUser: (req, res, next) => {
    User.findById(req.params.id).then((err, user) => {
      if (err) res.send(err);
      else if (!user) res.status(404).json({ error: 'This user not exists' });
      else res.send(user);
      next();
    });
  },

  followUser: (req, res, next) => {
    const { userId, id } = req.body;
    User.findById(id)
      .then((user) => {
        return user.follow(userId).then(() => {
          return res.json({ msg: 'followed' });
        });
      })
      .catch(next);
  },
  getUserProfile: (req, res, next) => {
    User.findById(req.params.id)
      .then((_user) => {
        return User.find({ following: req.params.id }).then((_users) => {
          _users.forEach((user_) => {
            _user.addFollower(user_);
          });
          return Article.find({ author: req.params.id }).then((_articles) => {
            return res.json({ user: _user, articles: _articles });
          });
        });
      })
      .catch(next);
  },
};
