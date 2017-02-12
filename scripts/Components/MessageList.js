import React, { Component } from 'react';
import Message from './Message';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

const styles = {
    title: {
        height: '48px',
        margin: '1em 0'
    },
    messageList: {
        position: 'fixed',
        maxHeight: '76%',
        bottom: '8em',
        width: '79%',
        overflowY: 'scroll'
    }
}

class MessageList extends Component {
    render() {
        return (
            <div className='messages container-fluid'>
                <List>
                <Paper zDepth={3} style={styles.title}>
                  <Subheader> Conversation: </Subheader>
                </Paper>
                <div style={styles.messageList} className="container-fluid">
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
                </div>
                </List>
            </div>
        );
    }  
}

export default MessageList;