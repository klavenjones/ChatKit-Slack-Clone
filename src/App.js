import React, { Component, Fragment } from "react";
import UserForm from "./components/UserForm";
import ChatScreen from "./components/ChatScreen";

class App extends Component {
  constructor(props) {
    super(props);
    this.onUserSubmitted = this.onUserSubmitted.bind(this);

    this.state = {
      currentScreen: "WhatIsYourUserNameScreen",
      currentUsername: ""
    };
  }

  onUserSubmitted = username => {
    fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    })
      .then(response => {
        console.log("success ", response);
        this.setState({
          currentUsername: username,
          currentScreen: "ChatScreen"
        });
      })
      .catch(err => console.log("ERROR"));
  };

  render() {
    if (this.state.currentScreen === "WhatIsYourUserNameScreen") {
      return <UserForm onSubmit={this.onUserSubmitted} />;
    } else if (this.state.currentScreen === "ChatScreen") {
      return <ChatScreen currentUsername={this.state.currentUsername} />;
    }
  }
}

export default App;
