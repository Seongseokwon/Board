import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',
      isEmail: false,
      emailCheck: '',
      errorMessage: '',
    };
  }
  vaildateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  // ? InputValueChange
  handleInputValue = (key) => (e) => {
    if (key === 'email') {
      if (!this.vaildateEmail(e.target.value)) {
        this.setState({
          isEmail: false,
          emailCheck: '유효하지 않은 이메일 입니다.',
        });
      } else {
        this.setState({
          isEmail: true,
          emailCheck: '유효한 이메일 입니다.',
        });
      }
    }
    this.setState({ [key]: e.target.value });
  };

  // ? SingUp Button Click
  handleSignUp = () => {
    // 항목 있는지 확인해서 없는항목 채우세요 경고메세지 띄우기
    let inputData = {
      email: this.state.email,
      password: this.state.password,
      userName: this.state.userName,
      emailCheck: this.state.emailCheck,
    };

    for (let [key, value] of Object.entries(inputData)) {
      if (value === '') {
        return this.setState({
          errorMessage: `${key} 항목이 입력되지 않았습니다.`,
        });
      }
      if (key === 'emailCheck') {
        if (value !== '유효한 이메일 입니다.') {
          return;
        }
      }
    }
    const { email, password, userName } = inputData;
    // TODO : 회원가입 요청 보내기 then => 회원가입 완료 / catch => 실패
    axios
      .post(
        'https://localhost:4000/user/signup',
        { email, password, userName },
        {
          'Content-Type': 'application/json',
          withCredentials: true,
        }
      )
      .then((res) => {
        alert('회원가입 완료');
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({ emailCheck: '중복된 아이디가 존재합니다.' });
        console.log(err);
      });
  };
  render() {
    return (
      <div className="signUp">
        <div className="sign_up_center">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>Sign Up</h1>
            <div className="txt_field">
              <input
                type="email"
                onChange={this.handleInputValue('email')}
                required
              />
              <label>Email</label>
              <span></span>
            </div>
            <div className={this.state.isEmail ? 'emailOk' : 'emailError'}>
              {this.state.emailCheck}
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
            <div className="txt_field">
              <input
                type="text"
                onChange={this.handleInputValue('userName')}
                required
              />
              <label>Name</label>
              <span></span>
            </div>
            <button
              className="submit"
              type="submit"
              onClick={this.handleSignUp}
            >
              회원가입
            </button>
          </form>
          <div className="errorMsg">{this.state.errorMessage}</div>
        </div>
      </div>
    );
  }
}
export default withRouter(SignUp);
