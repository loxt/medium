import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import {
  SignInUser,
  toggleOpen,
  toggleClose,
} from '../../redux/actions/actions';

// eslint-disable-next-line no-shadow
function SignInWith({ SignInUser: SignInUser1, modalMode, toggle }) {
  const responseGoogle = (res) => {
    const postData = {
      name: res.w3.ig,
      provider: 'google',
      email: res.w3.U3,
      provider_id: res.El,
      token: res.Zi.access_token,
      provider_pic: res.w3.Paa,
    };
    console.log(postData);
    // build our user data
    SignInUser1(postData);
    toggle();
  };
  return (
    <div>
      <div
        data-behavior='overlay'
        className={
          modalMode === true
            ? 'overlay overlay-hugeinc open'
            : 'overlay overlay-hugeinc'
        }
      >
        <button
          onClick={toggle}
          data-behavior='close-overlay'
          type='button'
          className='overlay-close'
        >
          <span className='glyphicon glyphicon-remove' />
        </button>
        <nav>
          <h2 className='grayed-heading center'>Sign In</h2>
          <ul className='omniauth-button-group'>
            <li className='omniauth-button google'>
              <GoogleLogin
                className='button google'
                clientId='YOUR_CLIENT_ID_HERE.apps.googleusercontent.com'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              >
                <i className='fa fa-google' />
                <span> SignIn with Google</span>
              </GoogleLogin>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modalMode: state.common.modalMode,
  };
};
export default connect(mapStateToProps, {
  toggleOpen,
  toggleClose,
})(SignInWith);
