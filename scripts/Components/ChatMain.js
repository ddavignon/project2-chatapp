import React, {
    Component
}
from 'react';
import SocketIO from 'socket.io-client';
import {
    Grid,
    Col,
    Row
}
from 'react-bootstrap';
import axios from 'axios';

import MessageBox from './MessageBox';
import MessageList from './MessageList';
import UserList from './UserList';

const Socket = SocketIO.connect();

class ChatMain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            users: [
                "Alice", "Bob"
            ],
            text: '',
            user: ['img':'','user':''],
            usersConnected: "",
        }

        this.handleMessageSubmit = this
            .handleMessageSubmit
            .bind(this);
        this.messageRecieve = this
            .messageRecieve
            .bind(this);
        this.userJoined = this
            .userJoined
            .bind(this);
        this.userLeft = this
            .userLeft
            .bind(this);
        this.updateUsersConnected = this
            .updateUsersConnected
            .bind(this);
        this.loadMessages = this
            .loadMessages
            .bind(this);
        this.botAbout = this.botAbout.bind(this);
        this.botHelp = this.botHelp.bind(this);
        this.botSay = this.botSay.bind(this);


        Socket.emit('get:messages');
    }

    componentDidMount() {
        Socket
            .on('connect', function() {
                console.log('Connecting to the server!');
            });
        Socket.once('event', this.loadMessages);
        Socket.on('update', this.updateUsersConnected);
        Socket.on('init', this.initialize);
        Socket.on('send:message', this.messageRecieve);
        Socket.on('user:join', this.userJoined);
        Socket.on('user:left', this.userLeft);
        Socket.on('about', this.botAbout);
        Socket.on('help', this.botHelp);
        Socket.on('say', this.botSay);

        // const messages = axios.get('/chat');
        // console.log('messages', messages);

    }

    loadMessages(message) {
        //console.log('user', users)
        var {
            messages
        } = this.state;
        console.log('messages', message);
        for (var data of message) {
            console.log(data);
            messages.push(data);
        }
        this.setState({
            messages
        });
    }

    updateUsersConnected(usersConnected) {
        console.log('update ' + usersConnected);
        this.setState({
            usersConnected
        });
    }

    initialize(data) {
        var {
            user
        } = data;
        // this.setState({
        //     users,
        //     user: name
        // });
    }

    messageRecieve(data) {
        console.log("message received! ")
        console.log(data)
        var {
            messages
        } = this.state;
        messages.push(data);
        this.setState({
            messages
        });
    }

    botAbout() {
        var {
            messages
        } = this.state;
        messages.push({
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: 'Welcome to the General Chat Room! Go ahead and chat some chitt!'
        });
        this.setState({
            messages
        });
    }

    botHelp() {
        var {
            messages
        } = this.state;
        messages.push({
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! about - I\'ll give you a general rundown of where you are at!, !! help - well you made it!, !! say <something> - and hopefully it\'s cool...'
        });
        this.setState({
            messages
        });
    }

    botSay(data) {
        var {
            messages
        } = this.state;
        messages.push({
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: data
        });
        this.setState({
            messages
        });
    }

    userJoined(data) {
        var {
            users,
            messages
        } = this.state;
        var {
            name
        } = data;
        users.push(name);
        messages.push({
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: name + ' Joined'
        });
        this.setState({
            users,
            messages
        });
    }

    userLeft(data) {
        var {
            users,
            messages
        } = this.state;
        var {
            name
        } = data;
        var index = users.indexOf(name);
        users.splice(index, 1);
        messages.push({
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: name + ' Left'
        });
        this.setState({
            users,
            messages
        });
    }

    handleMessageSubmit(message) {
        // var {messages} = this.state; messages.push(message);
        // this.setState({messages});
        FB.getLoginStatus((response) => {
          if (response.status == 'connected') {
            Socket.emit('send:message', {
              'facebook_user_token': response.authResponse.accessToken,
              'message' :message
            });
        }
    });
    }

    render() {
        const style = {
            margin: "0 .5em"
        }

        return (
            <div className="chatMain">
                <Grid fluid>
                    <Row style={style} >
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
