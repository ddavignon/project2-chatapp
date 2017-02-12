import React, { Component } from 'react';
import Paper from 'material-ui/Paper'

const styles = {
    messageBox: {
        margin: '10px',
        padding: '0 10px',
        minHeight: '30px'
    }
}

class Message extends Component {
    render() {
        return (
            <div className='message'>
                <Paper zDepth={2} style={styles.messageBox}>
                    <strong>{this.props.user} :</strong>
                    <span>{this.props.text}</span>
                </Paper>
            </div>
        );
    }
}

export default Message;