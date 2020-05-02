import api from '../../../config/api';

export function loadArticles() {
  return (dispatch) => {
    api
      .get('articles')
      .then(({ data: articles }) => {
        dispatch({ type: 'LOAD_ARTICLES', articles });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}

export function getUser(id) {
  return (dispatch) => {
    api
      .get(`user/profile/${id}`)
      .then(({ data: profile }) => {
        dispatch({ type: 'SET_PROFILE', profile });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}

export function getArticle(articleId) {
  return (dispatch) => {
    api
      .get(`article/${articleId}`)
      .then(({ data: article }) => {
        dispatch({ type: 'VIEW_ARTICLE', article });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}

export function clap(articleId) {
  return (dispatch) => {
    api
      .post('article/clap', { articleId })
      .then(() => {
        dispatch({ type: 'CLAP_ARTICLE' });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}

export function follow(id, userId) {
  return (dispatch) => {
    api
      .post('user/follow', { id, userId })
      .then(() => {
        dispatch({ type: 'FOLLOW_USER', userId });
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
}

export function SignInUser(userData) {
  return (dispatch) => {
    api.post('user', userData).then(({ data: user }) => {
      localStorage.setItem('Auth', JSON.stringify(user));
      dispatch({ type: 'SET_USER', user });
    });
  };
}

export function toggle() {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_MODAL', modalMode: !this.modalMode });
  };
}
