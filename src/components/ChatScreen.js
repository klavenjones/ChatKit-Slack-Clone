import React, { Component, Fragment } from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";

import { INSTANCE_LOCATOR, ROOM_ID } from "../keys";

import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import TypingIndicator from "./TypingIndicator";
import WhoseOnlineList from "./WhoseOnlineList";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      currentRoom: {},
      currentUser: {},
      usersWhoAreTyping: []
    };
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: INSTANCE_LOCATOR,
      userId: this.props.currentUsername,
      tokenProvider: new TokenProvider({
        url: "http://localhost:3001/authenticate"
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        console.log("USER ", currentUser);
        this.setState({ currentUser });
        return currentUser
          .subscribeToRoom({
            roomId: ROOM_ID,
            messageLimits: 100,
            hooks: {
              onMessage: message => {
                console.log("Received message:", message);
                this.setState({
                  messages: [...this.state.messages, message]
                });
              },
              onUserStartedTyping: user => {
                this.setState({
                  usersWhoAreTyping: [
                    ...this.state.usersWhoAreTyping,
                    user.name
                  ]
                });
              },
              onUserStoppedTyping: user => {
                this.setState({
                  usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                    username => username !== user.name
                  )
                });
              }
            }
          })
          .then(currentRoom => this.setState({ currentRoom }));
      })
      .catch(err => console.log(err));
  }

  sendMessage = text => {
    this.state.currentUser.sendMessage({
      roomId: this.state.currentRoom.id,
      text
    });
  };

  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({
        roomId: this.state.currentRoom.id
      })
      .catch(err => console.log(err));
  };

  render() {
    const styles = {
      container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      },
      chatContainer: {
        display: "flex",
        flex: 1
      },
      whosOnlineListContainer: {
        width: "300px",
        flex: "none",
        padding: 20,
        backgroundColor: "#2c303b",
        color: "white"
      },
      chatListContainer: {
        padding: 20,
        width: "85%",
        display: "flex",
        flexDirection: "column"
      }
    };

    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <h1>Who's Online</h1>
            <WhoseOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <h1>Welcome, {this.props.currentUsername}</h1>
            <MessageList
              messages={this.state.messages}
              style={styles.chatList}
            />
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
          </section>
        </div>
      </div>
    );
  }
}
