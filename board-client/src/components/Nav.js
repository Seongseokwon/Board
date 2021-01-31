import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.jpeg';
class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        {this.props.isLogin ? (
          <div className="btn-box">
            <Link className="link-btn" to="/addpost">
              글쓰기
            </Link>
            <Link className="link-btn" to="/mypage">
              My Page
            </Link>
            <button
              className="link-btn"
              onClick={() => this.props.handleLogout()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="btn-box">
            <Link to="/signin" className="link-btn">
              Sign In
            </Link>
            <Link className="link-btn" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    );
  }
}
export default Nav;
