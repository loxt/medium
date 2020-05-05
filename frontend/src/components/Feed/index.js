import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadArticles } from '../../redux/actions/actions';
import AsideFeed from '../AsideFeed';

import { store } from '../../redux/store';

function Feed() {
  const { articles } = store.getState();
  useEffect(() => {
    loadArticles();
  });

  const articlesReverse = articles.reverse().map((article) => {
    const { author, featureImg } = article;
    const { name, providerPic } = author;
    return (
      <div className='post-panel'>
        <div className='post-metadata'>
          <img
            alt=''
            className='avatar-image'
            src={providerPic}
            height='40'
            width='40'
          />
          <div className='post-info'>
            <div data-react-className='PopoverLink'>
              <span className='popover-link' data-reactroot=''>
                <a href={`/profile/${author.id}`}>{name}</a>
              </span>
            </div>
            <small>Posted • A must read</small>
          </div>
        </div>
        {featureImg.length > 0 ? (
          <div className='post-picture-wrapper'>
            <img src={featureImg} alt='Thumb' />
          </div>
        ) : (
          ''
        )}
        <div className='main-body'>
          <h3 className='post-title'>
            <a href={`/articleview/${article.id}`}>{article.title}</a>
          </h3>
          <div className='post-body'>
            <p className=''>article.description</p>
          </div>
          <a className='read-more' href={`/articleview/${article._id}`}>
            Read more
          </a>
        </div>
        <div className='post-stats clearfix'>
          <div className='pull-left'>
            <div className='like-button-wrapper'>
              <form className='button_to' method='get' action=''>
                <button
                  className='like-button'
                  data-behavior='trigger-overlay'
                  type='submit'
                >
                  <i className='fa fa-heart-o' />
                  <span className='hide-text'>Like</span>
                </button>
              </form>
              <span className='like-count'>{article.claps}</span>
            </div>
          </div>
          <div className='pull-right'>
            <div className='bookmark-button-wrapper'>
              <form className='button_to' method='get' action=''>
                <button
                  className='bookmark-button'
                  data-behavior='trigger-overlay'
                  type='submit'
                >
                  {' '}
                  <span className='icon-bookmark-o' />
                  <span className='hide-text'>Bookmark</span>
                </button>
              </form>
            </div>
          </div>
          <div className='response-count pull-right' />
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className='container-fluid main-container'>
        <div className='col-md-6 col-md-offset-1 dashboard-main-content'>
          <div
            className='posts-wrapper animated fadeInUp'
            data-behavior='endless-scroll'
            data-animation='fadeInUp-fadeOutDown'
          >
            {articles}
          </div>
        </div>
        {articlesReverse ? <AsideFeed _articles={articlesReverse} /> : ''}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
  };
};

export default connect(mapStateToProps, { loadArticles })(Feed);
