import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      hitCount: 0,
      likeCount: 0,
      createdAt: '',
      userName: '',
      boardList: [],
    };
  }

  componentDidMount() {
    axios
      .get('https://localhost:4000/board/readPost', {
        withCredentials: true,
        'Content-Type': 'application/json',
      })
      .then((res) =>
        this.setState({ boardList: this.state.boardList.concat(res.data.data) })
      )
      .catch((err) => console.log(err));
  }
  render() {
    const list = this.state.boardList.map((el) => {
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
          <td>{el.user.userName}</td>
          <td>{el.createdAt.slice(0, 10)}</td>
          <td>{el.hitCount}</td>
          <td>{el.likeCount}</td>
        </tr>
      );
    });
    return (
      <div>
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
      </div>
    );
  }
}
export default Post;
