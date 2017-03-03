import React, {Component} from 'react';
import {List} from 'material-ui/List';
import Message from './Message';

const styles = {
    messageList: {
        position: 'fixed',
        top: '4em',
        right: '0',
        width: '80%',
        bottom: '6.25em',
        overflow: 'auto',
        backgroundColor: 'rgb(255,64,129)',
        padding: '1em'
    },
    chatWindow: {
        position: 'fixed',
        bottom: '0'
    }
}

class MessageList extends Component {
    render() {
        var displayMessage;
        var messageStyles;
        var userMessage;
        
        return (
            <div className='messages'>
                <List style={styles.messageList}>
                {this
                    .props
                    .messages
                    .map((message, i) => {
                        if (message.text.includes('http://') || message.text.includes('https://')) {
                            if (message.text.includes('.png') || message.text.includes('.jpeg') || message.text.includes('.jpg') || message.text.includes('.gif')) {
                                userMessage = <span>{message.user}<br></br><img style={{height: '200px', paddingTop: '.5em'}} alt={message.text} src={message.text} /></span>;
                                displayMessage = (<span><a href={message.text} target="_blank">{message.text}</a></span>);
                                messageStyles={height: '270px', margin: '.5em'}
                            } else {
                                userMessage= message.user
                                displayMessage = <a href={message.text} target="_blank">{message.text}</a>;
                                messageStyles={margin: '.5em'}
                            }
                            return (<Message key={i} img={message.img} user={userMessage} text={displayMessage} styles={messageStyles}/>);
                        } else {
                            userMessage= message.user
                            displayMessage = message.text;
                            messageStyles={margin: '.5em'}
                        return (<Message key={i} img={message.img} user={userMessage} text={displayMessage} styles={messageStyles}/>);
                        }
                    })
                }
                </List>
            </div>
        );
    }
}

export default MessageList;