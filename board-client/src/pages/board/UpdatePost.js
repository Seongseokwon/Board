import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UpdatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      content: this.props.content,
    };
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleUpdatePost = () => {
    axios
      .put(
        'https://localhost:4000/board/updatePost',
        {
          id: this.state.id,
          title: this.state.title,
          content: this.state.content,
        },
        { withCredentials: true, 'Content-Type': 'applicaion/json' }
      )
      .then((res) => console.log(res));
    this.props.history.go(-1);
  };
  render() {
    return (
      <div>
        <div>
          <div>
            <label>제목</label>
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleInputValue('title')}
              required
            />
            <label>내용</label>
            <textarea
              type="text"
              value={this.state.content}
              onChange={this.handleInputValue('content')}
              required
            />
            <button onClick={this.handleUpdatePost}>저장</button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(UpdatePost);
