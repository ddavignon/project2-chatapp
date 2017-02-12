import React, { Component } from 'react';
import Message from './Message';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

const styles = {
    title: {
        height: '48px',
        margin: '1em 0'
    }
}

class MessageList extends Component {
    render() {
        return (
            <div className='messages'>
                <List>
                <Paper zDepth={3} style={styles.title}>
                  <Subheader> Conversation: </Subheader>
                </Paper>
                {
                  this.props.messages.map((message, i) => {
                      return (
                            <Message
                                key={i}
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