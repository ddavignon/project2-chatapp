import React, {Component} from 'react';
import {Col} from 'react-bootstrap';
import {List} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import Message from './Message';
const styles = {
    messageList: {
        position: 'fixed',
        maxHeight: '86.5%',
        bottom: '8em',
        width: '100%',
        overflow: 'auto',
        marginTop: '100em'
    }
}

class MessageList extends Component {

    render() {
        return (
            <div className='messages'>
                <List style={styles.messageList}>
                    <Col xs={11} md={9}>
                        {this
                            .props
                            .messages
                            .map((message, i) => {
                                return (<Message key={i} img={message.img} user={message.user} text={message.text}/>);
                            })
}
                    </Col>
                </List>
            </div>
        );
    }
}

export default MessageList;