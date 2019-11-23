import React, { Component } from "react";

export default class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  onChange = e => {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
  };

  render() {
    const styles = {
      container: {
        padding: 20,
        borderTop: "1px #4C758F solid",
        marginBottom: 20
      },
      form: {
        display: "flex"
      },
      input: {
        color: "inherit",
        background: "none",
        outline: "none",
        border: "none",
        flex: 1,
        fontSize: 16
      }
    };
    return (
      <div style={styles.container}>
        <div>
          <form style={styles.form} onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="What is your message?"
              onChange={this.onChange}
              style={styles.input}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}
