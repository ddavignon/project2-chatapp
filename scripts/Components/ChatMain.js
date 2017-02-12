import React, {Component} from 'react';
import SocketIO from 'socket.io-client';

import MessageBox from './MessageBox';
import MessageList from './MessageList';
import UserList from './UserList';

const Socket = SocketIO.connect();

class ChatMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    user: "bob",
                    text: "hi"
                }, {
                    user: "Alice",
                    text: "Hey there bob"
                }, {
                    user: "Charlie",
                    text: "Has anyone seen Mac?"
                }
            ],
            users: [
                "Alice", "Bob"
            ],
            text: 'Yo! sup',
            user: "placeholder",
        }
        
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this._messageRecieve = this._messageRecieve.bind(this);
    }

    componentDidMount() {
        Socket
            .on('connect', function (count) {
                console.log('Connecting to the server!');
            });
        Socket.on('update', function(count){
            console.log('update' + count.count);
            // var {data} = this.props;
            // data.push(count.count);
            // this.setState({data});
        });
        Socket.on('init', this._initialize);
        Socket.on('send:message', this._messageRecieve);
        Socket.on('user:join', this._userJoined);
        Socket.on('user:left', this._userLeft);
        Socket.on('change:name', this._userChangedName);
    }

    _initialize(data) {
        var {users, name} = data;
        this.setState({users, user: name});
    }

    _messageRecieve(message) {
        console.log("message received! ")
        var {messages} = this.state;
        messages.push(message);
        this.setState({messages});
    }

    _userJoined(data) {
        var {users, messages} = this.state;
        var {name} = data;
        users.push(name);
        messages.push({
            user: 'APPLICATION BOT',
            text: name + ' Joined'
        });
        this.setState({users, messages});
    }

    _userLeft(data) {
        var {users, messages} = this.state;
        var {name} = data;
        var index = users.indexOf(name);
        users.splice(index, 1);
        messages.push({
            user: 'APPLICATION BOT',
            text: name + ' Left'
        });
        this.setState({users, messages});
    }

    _userChangedName(data) {
        var {oldName, newName} = data;
        var {users, messages} = this.state;
        var index = users.indexOf(oldName);
        users.splice(index, 1, newName);
        messages.push({
            user: 'APPLICATION BOT',
            text: 'Change Name : ' + oldName + ' ==> ' + newName
        });
        this.setState({users, messages});
    }

    handleMessageSubmit(message) {
        //var {messages} = this.state;
        //messages.push(message);
        //this.setState({messages});
        Socket.emit('send:message', message);
    }

    render() {
        return (
            <div>
                <div className="col-md-2">
                  <UserList users={this.state.users} total={this.state.data}/>
                </div>
                <div className="col-md-10">
                  <MessageList messages={this.state.messages} />
                </div>
                <MessageBox onMessageSubmit={this.handleMessageSubmit} user={this.state.user}/>
            </div>
        )
    }
}

export default ChatMain;