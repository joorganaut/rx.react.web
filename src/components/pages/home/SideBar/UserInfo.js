import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';

class UserInfo extends Component {

  state = {
    isShowingUserMenu: false
  };

  render() {
    let { user } = this.props;
    let { isShowingUserMenu } = this.state;
    return (
      <div className="user-wrapper">
        <div className="user">
          <img src={'/'} alt={'unknown'} className="photo" />
          <div className="userinfo">
            <div className="username">
              {'unknown'}
            </div>
            <div className="title">Admin</div>
          </div>
          <span
            onClick={() => this.setState({ isShowingUserMenu: !this.state.isShowingUserMenu })}
            className={'pe-7s-angle-down collapse-arrow'}></span>
        </div>
        <Collapse in={isShowingUserMenu}>
          <ul className="nav user-nav">
            <li><a href="#">My Profile</a></li>
            <li><a href="#">Edit Profile</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </Collapse>
      </div>
    );
  }
}


export default UserInfo;