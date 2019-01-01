import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Icon } from 'antd';
import TiSocialFacebook from 'react-icons/lib/ti/social-facebook';

class Facebookbtn extends React.Component {
  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <div>
      <p>
        <a className="facebook-before"><Icon type="facebook" /></a>
        <FacebookLogin
          appId="1729425590487138" // ebcd93f6d15c900283406ede1904c7be
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books"
          callback={this.responseFacebook}
          cssClass="facebook"
          />
      </p>
      <p>
        <a className="twitter-before"><Icon type="twitter" /></a>
        <button className="twitter">Login Using Twitter</button>
      </p>
      </div>
    )
  }
}

export default Facebookbtn;
