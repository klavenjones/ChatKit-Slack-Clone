import React, { Component } from "react";
import WhoseOnlineListItem from "./WhoseOnlineListItem";

export default class WhoseOnlineList extends Component {
  renderUsers() {
    return (
      <ul>
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <WhoseOnlineListItem key={index} presenceState="online">
                {user.name} (You)
              </WhoseOnlineListItem>
            );
          }
          return (
            <WhoseOnlineListItem
              key={index}
              presenceState={user.presence.state}
            >
              {user.name}
            </WhoseOnlineListItem>
          );
        })}
      </ul>
    );
  }

  render() {
    if (this.props.users) {
      return this.renderUsers();
    } else {
      return <p>Loading...</p>;
    }
  }
}
