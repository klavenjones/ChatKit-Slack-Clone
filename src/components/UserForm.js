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
    const styles = {
      container: {
        height: "100vh",
        display: "flex",
        overflowY: "hidden",
        flexDirection: "column"
      },
      form: {
        borderWidth: 5,
        borderStyle: "solid",
        borderColor: "lightgrey",
        borderRadius: "15px",
        width: 500,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        padding: 20
      },
      h1: {
        marginBottom: 30,
        fontSize: "2rem",
        textTransform: "uppercase"
      },
      input: {
        height: 30,
        borderStyle: "none",
        borderBottom: "2px solid #ccc",
        paddingBottom: 10,
        width: "100%",
        marginBottom: 40,
        marginTop: 20,
        fontSize: 20
      },
      button: {
        height: 35,
        cursor: "pointer",
        backgroundColor: "#DA3F62",
        color: "white",
        width: "30%",
        margin: "auto",
        marginBottom: 20,
        borderStyle: "none",
        borderRadius: "3px",
        fontSize: 20
      },
      message: { fontSize: 15 }
    };
    return (
      <div style={styles.container}>
        <form style={styles.form} onSubmit={this.onSubmit}>
          <h1 style={styles.h1}>Let's Talk</h1>
          <input
            type="text"
            placeholder="What is your name?"
            style={styles.input}
            onChange={this.onChange}
          />
          <button style={styles.button} type="submit">
            Let's Chat
          </button>
        </form>
      </div>
    );
  }
}
