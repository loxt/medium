import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FollowButton from '../FollowButton';
import { follow, getUser } from '../../redux/actions/actions';

function Profile(props) {
  const { profile } = props;
  useEffect(() => {
    document.body.className = 'users show';
    document.body.className = '';
    props.getUser(props.match.params.id);
  }, []);
  return (
    <div>
      {Object.keys(profile).length > 0 ? <ItemList items={props} /> : ''}
    </div>
  );
}

function ItemList({ items }) {
  const { provider } = items.profile.user;
  const { providerPic } = items.profile.user;
  const { length: length1 } = items.profile.user.following;
  const { length: length2 } = items.profile.user.followers;
  return (
    <div className='users show'>
      <div className='container-fluid main-container'>
        <div
          className='banner-container animated fadeInUp-small'
          data-animation='fadeInUp-fadeOutDown-slow'
        >
          <div className='hero-wrapper'>
            <header className='hero'>
              <div className='profile-info'>
                <h1 className='hero-title'>{items.profile.user.name}</h1>
                <p className='hero-description'>{items.profile.user.email}</p>
                <div className='hero-location'>
                  <i className='fa fa-map-marker' />
                  {provider}
                </div>
              </div>
              <div className='hero-avatar'>
                <img
                  alt={items.profile.user.name}
                  className='avatar-image'
                  src={providerPic}
                  height='100'
                  width='100'
                />
              </div>
            </header>
            <div>
              <div
                data-react-className='UserFollowContainer'
                data-react-props='{"followerCount":6,"followingCount":2,"following":false,"followed_id":396,"hideButton":false,"username":"mark","overlayTrigger":true}'
              >
                <div data-reactroot=''>
                  <div className='following-metadata'>
                    <span className='following-count'>
                      <span>
                        <span>
                          <b>{length1}</b> Following
                        </span>
                      </span>
                    </span>
                    <span className='follower-count'>
                      <span>
                        <span>
                          <b>{length2}</b> Followers
                        </span>
                      </span>
                    </span>
                  </div>
                  <div>
                    {items.user.name ? (
                      <FollowButton
                        user={`${items.user.following}`}
                        to_follow={`${items.profile.user._id}`}
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

        <div
          className='posts-wrapper animated fadeInUp'
          data-animation='fadeInUp-fadeOutDown'
        >
          <h4 className='small-heading border-top'>latest</h4>
          {items.profile.articles.map((article) => {
            const { length } = article.featureImg;
            const { featureImg } = article;
            const { _id } = article;
            return (
              <div className='post-panel'>
                <div className='post-metadata'>
                  <img
                    alt='mark'
                    className='avatar-image'
                    src={providerPic}
                    height='40'
                    width='40'
                  />
                  <div className='post-info'>
                    <div data-react-className='PopoverLink'>
                      <span className='popover-link' data-reactroot=''>
                        <a href='javascript:void(0);'>
                          {items.profile.user.name}
                        </a>
                      </span>
                    </div>
                    <small>Published • a must read</small>
                  </div>
                </div>

                {length > 0 ? (
                  <div className='post-picture-wrapper'>
                    <img src={featureImg} alt='alt' />
                  </div>
                ) : (
                  ''
                )}
                <div className='main-body'>
                  <h3 className='post-title'>
                    <a href={`/articleview/${_id}`}>{article.title}</a>
                  </h3>
                  <div className='post-body'>
                    <p
                      className=''
                      dangerouslySetInnerHTML={{ __html: article.description }}
                    />
                  </div>
                  <a className='read-more' href={`/articleview/${_id}`}>
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
                          <span className='icon-bookmark-o' />
                          <span className='hide-text'>Bookmark</span>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className='response-count pull-right'>
                    <a className='response-count' href='javascript:void(0);'>
                      0 responses
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    _article: state.articles.article,
    user: state.authUser.user,
    profile: state.authUser.profile,
  };
};
export default connect(mapStateToProps, {
  getUser,
  follow,
})(Profile);
