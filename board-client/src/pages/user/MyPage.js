import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO : 이메일 / 이름 / 가입일자 / 작성한 글
      email: '',
      userName: '',
      createdAt: '',
      writePost: [],
    };
  }
  componentDidMount() {
    axios
      .get('https://localhost:4000/user/info', {
        withCredentials: true,
        'Content-Type': 'application/json',
      })
      .then((res) => {
        const { userInfo, boardInfo } = res.data;
        this.setState({
          email: userInfo.email,
          userName: userInfo.userName,
          createdAt: userInfo.createdAt,
          writePost: this.state.writePost.concat(...boardInfo),
        });
      });
  }
  render() {
    let list = this.state.writePost.map((el) => {
      return (
        <tr key={el.id}>
          <td>{el.id}</td>
          <td>
            <Link
              className="postTitle"
              to="/detailpost"
              onClick={() => {
                this.props.handlePostNumber(el.id);
              }}
            >
              {el.title}
            </Link>
          </td>
          <td>{this.state.userName}</td>
          <td>{el.createdAt.slice(0, 10)}</td>
          <td>{el.hitCount}</td>
          <td>{el.likeCount}</td>
          <td>
            <button>삭제</button>
          </td>
        </tr>
      );
    });
    return (
      <>
        <div>
          <div className="email">{this.state.email}</div>
          <div className="userName">{this.state.userName}</div>
          <div className="createdAt">{this.state.createdAt.slice(0, 10)}</div>
        </div>
        <table className="table">
          <thead className="tableHeader">
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody className="tableBody">{list}</tbody>
        </table>
      </>
    );
  }
}
export default MyPage;
