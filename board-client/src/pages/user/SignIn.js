import axios from 'axios';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleLogin = () => {
    let inputData = {
      email: this.state.email,
      password: this.state.password,
    };
    //inputdata의 입력값이 빈값인지 아닌지 확인해주기
    for (let [key, value] of Object.entries(inputData)) {
      if (value === '') {
        return this.setState({
          errorMessage: `${key} 값이 입력되지 않았습니다.`,
        });
      }
    }
    axios
      .post('https://localhost:4000/user/signin', inputData, {
        'Content-Type': 'application/json',
        withCredentials: true,
      })
      .then((res) => {
        let userId = res.data.data;
        this.props.loginCheck(userId);
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({
          errorMessage:
            '아이디 / 비밀번호가 일치하지 않거나, 존재하지 않는 사용자 입니다.',
        });
      });
  };
  render() {
    return (
      <div className="signIn">
        <div className="sign_in_center">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign In</h1>
            <div className="txt_field">
              <input
                type="email"
                onChange={this.handleInputValue('email')}
                required
              />
              <label>Email</label>
              <span></span>
            </div>
            <div className="txt_field">
              <input
                type="password"
                onChange={this.handleInputValue('password')}
                required
              />
              <label>Password</label>
              <span></span>
            </div>
            <button className="submit" onClick={this.handleLogin}>
              로그인
            </button>
          </form>
          <div className="errorMsg">{this.state.errorMessage}</div>
        </div>
      </div>
    );
  }
}
export default withRouter(SignIn);
