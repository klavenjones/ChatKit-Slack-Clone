import React, { Component } from "react";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  onChange = e => {
    this.setState({ username: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="What is your username?"
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
