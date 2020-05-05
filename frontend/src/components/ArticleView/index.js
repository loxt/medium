import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clap, follow, getArticle } from '../../redux/actions/actions';
import FollowButton from '../FollowButton';

const mapStateToProps = (state) => {
  return {
    _article: state.articles.article,
    user: state.authUser.user,
  };
};

function ArticleView(props) {
  useEffect(() => {
    document.body.className = 'posts show';
    props.getArticle(props.match.params.id);

    document.body.className = '';
  }, []);

  const { _article } = props;
  const { user } = props;
  const { following } = user;
  const { _id: id } = _article;

  const { text, claps, title, featureImg, author } = _article;
  let authorName;
  let authorImg;
  let authorId;
  if (author) {
    const { name, providerPic, _id } = author;
    authorName = name;
    authorId = _id;
    authorImg = providerPic;
  }
  return (
    <div>
      <div className='container-fluid main-container'>
        <div
          className='row animated fadeInUp'
          data-animation='fadeInUp-fadeOutDown'
        >
          <div
            id='main-post'
            className='col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content'
          >
            <div className='pull-right'>
              {user ? (
                <FollowButton user={`${following}`} to_follow={`${authorId}`} />
              ) : (
                ''
              )}
            </div>
            <div className='post-metadata'>
              <img
                alt={authorName}
                className='avatar-image'
                src={authorImg}
                height='40'
                width='40'
              />
              <div className='post-info'>
                <div data-react-className='PopoverLink' data-react-props=''>
                  <span className='popover-link' data-reactroot=''>
                    <a href={`/profile/${authorId}`}>{authorName}</a>
                  </span>
                </div>
                <small>Published • nice story</small>
              </div>
            </div>

            {!featureImg || !featureImg.length > 0 ? (
              ''
            ) : (
              <div className='post-picture-wrapper'>
                <img src={featureImg} alt='feature img 540' />
              </div>
            )}
            <h3 className='title'>{title}</h3>
            <div className='body'>
              <p />
              <p className='' dangerouslySetInnerHTML={{ __html: text }} />
              <p />
            </div>
            <div className='post-tags'>
              <a className='tag' href=''>
                Story
              </a>
              <a className='tag' href=''>
                Community
              </a>
            </div>
            <div className='post-stats clearfix'>
              <div className='pull-left'>
                <div className='like-button-wrapper'>
                  <button
                    onClick={() => props.clap(id)}
                    className='like-button'
                    data-behavior='trigger-overlay'
                    type='submit'
                  >
                    <i className='fa fa-heart-o' />
                    <span className='hide-text'>Like</span>
                  </button>
                  <span className='like-count'>{claps}</span>
                </div>
              </div>
              <div className='pull-left'>
                <a className='response-icon-wrapper' href='#'>
                  <i className='fa fa-comment-o' />
                  <span
                    className='response-count'
                    data-behavior='response-count'
                  >
                    0
                  </span>
                </a>
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
            </div>
            <div className='author-info'>
              <div className='author-metadata'>
                <img
                  alt={authorName}
                  className='avatar-image'
                  src={authorImg}
                  height='50'
                  width='50'
                />
                <div className='username-description'>
                  <h4>{authorName}</h4>
                  <p />
                </div>
              </div>
              {user ? (
                <FollowButton user={`${following}`} to_follow={`${authorId}`} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div
          className='post-show-footer row animated fadeInUp'
          data-animation='fadeInUp-fadeOutDown'
        >
          <div className='col-xs-10 col-md-6 col-xs-offset-1 col-md-offset-3 main-content related-stories'>
            <h4 className='small-heading'>Related stories</h4>
            <div className='post-list-item'>
              <div className='flex-container'>
                <div className='avatar-wrapper'>
                  <img
                    alt=''
                    className='avatar-image'
                    src=''
                    height='40'
                    width='40'
                  />
                </div>
                <div className='post-info'>
                  <strong className='pli-title'>
                    <a href='#' />
                  </strong>
                  <br />
                  <small className='pli-username'>
                    <a href='#' />
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div
            id='responses'
            className='col-xs-10 col-md-6 col-xs-offset-1 col-md-offset-3 main-content'
          >
            <h4 className='small-heading'>Responses</h4>
            <div data-behavior='responses-list' />
          </div>
        </div>
        <div className='post-metadata-bar' data-page='post-metadata-bar'>
          <div
            className='flex-container is-inView'
            data-behavior='animated-metadata'
          >
            <div className='post-stats flex-container'>
              <div className='like-button-wrapper'>
                <form className='button_to' method='get' action=''>
                  <button
                    className='like-button'
                    data-behavior='trigger-overlay'
                    type='submit'
                  >
                    {' '}
                    <i className='fa fa-heart-o' />
                    <span className='hide-text'>Like</span>
                  </button>
                </form>{' '}
                <span className='like-count'>0</span>
              </div>

              <div>
                <a
                  className='response-icon-wrapper'
                  href='https://my-medium-clone.herokuapp.com/posts/it-s-looking-good#responses'
                >
                  <i className='fa fa-comment-o' />
                  <span
                    className='response-count'
                    data-behavior='response-count'
                  >
                    0
                  </span>
                </a>
              </div>
              <div className='bookmark-button'>
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
            </div>
            <div className='metabar-author-info flex-container flex-space-btw'>
              <div>
                <img
                  alt={authorName}
                  className='avatar-image'
                  src={authorImg}
                  height='35'
                  width='35'
                />
                <div data-react-className='PopoverLink'>
                  <span className='popover-link' data-reactroot=''>
                    <a href={`/profile/${authorImg}`}>{authorName}</a>
                  </span>
                </div>
              </div>
              <div data-react-className='UserFollowButton'>
                {user ? (
                  <FollowButton
                    user={`${following}`}
                    to_follow={`${authorId}`}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {
  getArticle,
  clap,
  follow,
})(ArticleView);
