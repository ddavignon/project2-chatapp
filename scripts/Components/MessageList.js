import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { List } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import Message from './Message';
const styles = {
    title: {
        height: '48px',
        margin: '1em 0'
    },
    messageContainer: {
        width: '100%'
    },
    messageList: {
        position: 'fixed',
        maxHeight: '76%',
        bottom: '8em',
        width: '81%',
        overflowY: 'scroll'
    }
}

class MessageList extends Component {
    render() {
        return (
            <div className='messages'>
                <List style={styles.messageContainer}>
                <Paper zDepth={3} style={styles.title}>
                  <Subheader> Conversation: </Subheader>
                </Paper>
                <div style={styles.messageList} >
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