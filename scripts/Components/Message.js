import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

class Message extends Component {
    render() {
        return (
            <div className='message'>
                <ListItem
                    key={this.props.messageKey}
                    leftAvatar={<Avatar src="" />}
                    primaryText={this.props.user}
                    secondaryText={
                        <p>
                        {this.props.text}
                        </p>
                    }
                />
            </div>
        );
    }
}

export default Message;