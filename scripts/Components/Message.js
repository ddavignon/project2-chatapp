import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

class Message extends Component {
    /*
            var displayMessage;
        var messageStyles;
        var userMessage;

        function handleMessage(message, i) {
            if (validator.isURL(message.text)) {
                if (isImage(message.text)) {
                    userMessage = <span>{message.user}<br></br><img style={{height: '200px', paddingTop: '.5em'}} alt={message.text} src={message.text} /></span>;
                    displayMessage = (<span><a href={message.text} target="_blank">{message.text}</a></span>);
                    messageStyles = {
                        height: '265px',
                        margin: '.5em'
                    }
                }
                else {
                    userMessage = message.user
                    displayMessage = <a href={message.text} target="_blank">{message.text}</a>;
                    messageStyles = {
                        margin: '.5em'
                    }

                }
            }
            else {
                userMessage = message.user
                displayMessage = message.text;
                messageStyles = {
                    margin: '.5em'
                }
            }
            return (<Message key={i} img={message.img} user={userMessage} text={displayMessage} styles={messageStyles}/>);
        }
    */
    
    render() {
        return (
            <div className='message'>
                <Paper zDepth={5}>
                    <ListItem
                        style={this.props.styles}
                        leftAvatar={<Avatar src={this.props.img} />}
                        primaryText={this.props.user}
                        secondaryText={
                            <p>
                            {this.props.text}
                            </p>
                        }
                    />
                </Paper>
            </div>
        );
    }
}

export default Message;