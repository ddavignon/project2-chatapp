import React, {Component} from 'react';
import SocketIO from 'socket.io-client';
import {Grid, Col, Row} from 'react-bootstrap';
import axios from 'axios';

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
                    img: "http://placehold.it/200x200",
                    user: "bob",
                    text: "hi"
                }, {
                    img: "http://placehold.it/200x200",
                    user: "Alice",
                    text: "Hey there bob"
                }, {
                    img: "http://placehold.it/200x200",
                    user: "Charlie",
                    text: "Has anyone seen Mac?"
                }
            ],
            users: [
                "Alice", "Bob"
            ],
            text: 'Yo! sup',
            user: "placeholder",
            usersConnected: "",
        }

        this.handleMessageSubmit = this
            .handleMessageSubmit
            .bind(this);
        this._messageRecieve = this
            ._messageRecieve
            .bind(this);
        this._userJoined = this
            ._userJoined
            .bind(this);
        this._userLeft = this
            ._userLeft
            .bind(this);
        this._updateUsersConnected = this
            ._updateUsersConnected
            .bind(this)
        this._loadMessages = this
            ._loadMessages
            .bind(this)
    }

    componentDidMount() {
        Socket
            .on('connect', function () {
                console.log('Connecting to the server!');
            });
        Socket.on('event', this._loadMessages);
        Socket.on('update', this._updateUsersConnected);
        Socket.on('init', this._initialize);
        Socket.on('send:message', this._messageRecieve);
        Socket.on('user:join', this._userJoined);
        Socket.on('user:left', this._userLeft);
        Socket.on('change:name', this._userChangedName);
        // const messages = axios.get('/chat');
        // console.log('messages', messages);
        
    }
    
    _loadMessages(message) {
        console.log('messages', message); 
        //console.log('user', users)
        var {messages} = this.state;
        messages.push(message);
        this.setState({messages});
    }
    
    _updateUsersConnected(usersConnected) {
        console.log('update ' + usersConnected);
        this.setState({usersConnected});
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
            img: '../../static/bot.jpeg',
            user: 'BOT BOT',
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
            img: '../../static/bot.jpeg',
            user: 'BOT BOT',
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
            img: '../../static/bot.jpeg',
            user: 'BOT BOT',
            text: 'Change Name : ' + oldName + ' ==> ' + newName
        });
        this.setState({users, messages});
    }

    handleMessageSubmit(message) {
        // var {messages} = this.state; messages.push(message);
        // this.setState({messages});
        Socket.emit('send:message', message);
    }

    render() {
        const style = {
            margin: "0 .5em"
        }

        return (
            <div className="chatMain">
                <Grid fluid>
                    <Row style={style}>
                        <Col md={2}>
                            <UserList img={this.state.img} users={this.state.users} total={this.state.usersConnected}/>
                        </Col>
                        <Col md={10}>
                            <MessageList messages={this.state.messages}/>
                        </Col>
                    </Row>
                </Grid>
                <MessageBox onMessageSubmit={this.handleMessageSubmit} user={this.state.user}/>
            </div>
        )
    }
}

export default ChatMain;