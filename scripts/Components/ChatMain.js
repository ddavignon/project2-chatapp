import React, { Component } from 'react';
import SocketIO from 'socket.io-client';

import MessageBox from './MessageBox';
import MessageList from './MessageList';
import UserList from './UserList';


const Socket = SocketIO.connect();

class ChatMain extends Component {

    constructor() {
        super()
        this.state = {
            messages: 
            [
                {
                    "user": "bob",
                    "text": "hi"
                },
                {
                    "user": "Alice",
                    "text": "Hey there bob"
                }
            ],
            users: ["Alice", "Bob"],
            user: ["Charlie"]
        }
        
    }

    componentDidMount() {
        Socket.on('connect', function() {
         console.log('Connecting to the server!');
        });
    }
    
    
    render() {
        return (
            <div>
                <UserList 
                  users={this.state.users} 
                  />
                <MessageList
                  messages={this.state.messages} 
                  />
                <MessageBox 
                  //onMessageSubmit={this.handleMessageSubmit}
                  user={this.state.user} 
                  />
            </div>
        )
    }
}

export default ChatMain;