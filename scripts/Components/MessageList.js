import React, { Component } from 'react';
import Message from './Message';
import { List } from 'material-ui/List';

class MessageList extends Component {
    
    render() {
        return (
            <div className='messages'>
                <h2> Conversation: </h2>
                <List>
                {
                  this.props.messages.map((message, i) => {
                      return (
                            <Message
                                messageKey={i}
                                user={message.user}
                                text={message.text}
                            />
                      );
                  })
                }
                </List>
            </div>
        );
    }
    
}

export default MessageList;