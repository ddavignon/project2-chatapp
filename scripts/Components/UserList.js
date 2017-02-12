import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class UserList extends Component {
    render() {
      return (
          <div className='users'>
              <List>
                  <Subheader>Online Users</Subheader>
                  {
                      this.props.users.map((user, i) => {
                          return (
                              <ListItem 
                              key={i}
                              primaryText={user}
                              leftAvatar={<Avatar src="" />}
                              rightIcon={<CommunicationChatBubble />}
                              />
                          );
                      })
                  }
              </List>              
          </div>
      );
  }
}

export default UserList;