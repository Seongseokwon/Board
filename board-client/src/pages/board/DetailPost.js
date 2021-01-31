import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DetailPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      hitCount: 0,
      likeCount: 0,
      createdAt: '',
      userName: '',
    };
  }
  componentDidMount() {
    axios
      .post(
        'https://localhost:4000/board/detailPost',
        { id: this.props.id },
        {
          'Content-Type': 'application/json',
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        const {
          title,
          content,
          hitCount,
          likeCount,
          createdAt,
          user,
        } = res.data.data;

        this.setState({
          title: title,
          content: content,
          hitCount: hitCount,
          likeCount: likeCount,
          createdAt: createdAt,
          userName: user.userName,
        });
      });
  }
  render() {
    const {
      title,
      content,
      hitCount,
      likeCount,
      createdAt,
      userName,
    } = this.state;
    let date = `${createdAt.slice(0, 10)}  ${createdAt.slice(11, 16)}`;

    return (
      <div className="detailPage">
        <div className="detail_header">
          <h2>{title}</h2>
          <p>{userName}</p>
          <p>{date}</p>
          <p>{hitCount}</p>
        </div>
        <div className="detail_content">
          <p>{content}</p>
          <p>{likeCount}</p>
        </div>
        <Link
          onClick={() =>
            this.props.handlePostUpdate(this.props.id, title, content)
          }
          to="/updatepost"
        >
          수정하기
        </Link>
      </div>
    );
  }
}
export default DetailPost;
