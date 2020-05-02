const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  text: String,
  title: String,
  description: String,
  featureImg: String,
  claps: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      text: String,
    },
  ],
});

ArticleSchema.methods.clap = function clap() {
  this.claps += 1;
  return this.save();
};

ArticleSchema.methods.comment = function comment(c) {
  this.comments.push(c);
  return this.save();
};

ArticleSchema.methods.addAuthor = function addAuthor(authorId) {
  this.author = authorId;
  return this.save();
};

ArticleSchema.methods.getUserArticle = function getUserArticle(id) {
  ArticleSchema.find({ author: id }).then((article) => {
    return article;
  });
};

module.exports = mongoose.model('Article', ArticleSchema);
