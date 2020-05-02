const initialState = {
  user: {},
  isAuth: false,
  profile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        isAuth: Object.keys(action.user).length > 0,
        user: action.user,
      };
    case 'FOLLOW_USER': {
      const user = { ...state.user };
      const { userId } = action;
      const { following } = user;
      following.push(userId);
      return {
        ...state,
        user,
      };
    }
    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
};
