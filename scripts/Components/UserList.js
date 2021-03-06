import React, {
    Component
}
from 'react';
import {
    List,
    ListItem
}
from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const styles = {
    paper: {
        margin: '1em 0'
    },
    sidePanel: {
        position: 'fixed',
        top: '5em',
        left: '2em',
        overflow: 'scroll'
    }
}

class UserList extends Component {
    render() {
        return (
            <div className='users'>
                <List style={styles.sidePanel}>
                    <Paper zDepth={3} style={styles.paper}>
                        <Subheader>Online Users: {this.props.total}</Subheader>
                    </Paper>   
                     <Paper zDepth={2} style={styles.paper}>
                    { 
                        this.props.users.map((user, i) => {
                            return (
                                <ListItem 
                                key={i}
                                primaryText={user}
                                rightIcon={<CommunicationChatBubble />}
                                />
                            )
                        })
                    }
                     </Paper>  
                </List>           
          </div>
        );
    }
}

export default UserList;
