import React, {Component} from 'react';
import {List} from 'material-ui/List';

import Message from './Message';
const styles = {
    messageList: {
        position: 'fixed',
        maxHeight: '90%',
        width: '80%',
        bottom: '6.25em',
        overflow: 'auto',
        backgroundColor: 'rgb(255,64,129)',
        padding: '1em'
    }
}

class MessageList extends Component {
    render() {
        return (
            <div className='messages'>
                <List style={styles.messageList}>
                {this
                    .props
                    .messages
                    .map((message, i) => {
                        return (<Message key={i} img={message.img} user={message.user} text={message.text}/>);
                    })
                }
                </List>
            </div>
        );
    }
}

export default MessageList;