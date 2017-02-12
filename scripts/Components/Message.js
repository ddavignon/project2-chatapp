import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';

class Message extends Component {
    render() {
        return (
            <div className='message'>
                <Paper zDepth={3}>
                    <ListItem
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