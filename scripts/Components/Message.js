import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

const styles = {
    messageItem: {
        margin: '.3em 0'
    }
}

class Message extends Component {
    render() {
        return (
            <div className='message'>
                <Paper zDepth={5}>
                    <ListItem
                        style={styles.messageItem}
                        leftAvatar={<Avatar src="" />}
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