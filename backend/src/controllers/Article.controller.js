const { v2: cloudinary } = require('cloudinary');
const Article = require('../models/Article.schema');

module.exports = {
  addArticle: (req, res, next) => {
    const { text, title, claps, description } = req.body;

    if (req.files.image) {
      cloudinary.uploader.upload(
        req.files.image.path,
        (result) => {
          const obj = {
            text,
            title,
            claps,
            description,
            featureImg: result.url != null ? result.url : '',
          };
          saveArticle(obj);
        },
        {
          resource_type: 'image',
          eager: [
            {
              effect: 'sepia',
            },
          ],
        }
      );
    } else {
      saveArticle({ text, title, claps, description, featureImg: '' });
    }

    function saveArticle(obj) {
      new Article(obj).save((err, article) => {
        if (err) res.send(err);
        else if (!article) res.send(400);
        else {
          const { addAuthor } = article;
          const { authorId } = req.body;
          addAuthor(authorId).then((_article) => {
            return res.send(_article);
          });
        }
        next();
      });
    }
  },

  getAll: (req, res, next) => {
    Article.find(req.params.id)
      .populate('author')
      .populate('comments.author')
      .exec((err, article) => {
        if (err) res.send(err);
        else if (!article) res.send(404);
        else res.send(article);
        next();
      });
  },

  clapArticle: (req, res, err) => {
    const { articleId } = req.body;
    Article.findById(articleId)
      .then((article) => {
        return article.clap().then(() => {
          return res.json({ msg: 'Done' });
        });
      })
      .catch(err);
  },

  commentArticle: (req, res, next) => {
    const { articleId, authorId: author, comment: text } = req.body;
    Article.findById(articleId)
      .then((article) => {
        return article
          .comment({
            author,
            text,
          })
          .then(() => {
            return res.json({ msg: 'Done' });
          });
      })
      .catch(next);
  },

  getArticle: (req, res, next) => {
    const { id } = req.params;
    Article.findById(id)
      .populate('author')
      .populate('comments.author')
      .exec((err, article) => {
        if (err) res.send(err);
        else if (!article) res.send(404);
        else res.send(article);
        next();
      });
  },
};
