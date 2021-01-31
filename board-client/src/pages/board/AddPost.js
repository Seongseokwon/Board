import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleAddPost = () => {
    axios
      .post(
        'https://localhost:4000/board/addPost',
        { title: this.state.title, content: this.state.content },
        { withCredentials: true, 'Content-Type': 'application/json' }
      )
      .then((res) => console.log(res));
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div>
          <label>제목</label>
          <input
            type="text"
            onChange={this.handleInputValue('title')}
            required
          />
          <label>내용</label>
          <textarea
            type="text"
            onChange={this.handleInputValue('content')}
            required
          />
          <button onClick={this.handleAddPost}>저장</button>
        </div>
      </div>
    );
  }
}
export default withRouter(AddPost);
