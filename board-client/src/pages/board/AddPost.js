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
          <button
            onClick={() =>
              this.props.handleAddPost(this.state.title, this.state.content)
            }
          >
            저장
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(AddPost);
