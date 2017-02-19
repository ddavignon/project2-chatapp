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

    constructor() {
        super();
        this.state = {
            messages: ['img': '', 'user': '', 'text': ''],
            users: [
                "Chitt Bot"
            ],
            text: '',
            user: ['img': '', 'user': ''],
            usersConnected: "",
        }
        Socket.emit('get:messages');
    }

    componentDidMount() {
        Socket
            .on('connect', function() {
                console.log('Connecting to the server!');
            });
        Socket.once('event', this.loadMessages.bind(this));
        Socket.on('update', this.updateUsersConnected.bind(this));
        Socket.on('init', this.initialize.bind(this));
        Socket.on('send:message', this.messageRecieve.bind(this));
        Socket.on('user:join', this.userJoined.bind(this));
        Socket.on('user:left', this.userLeft.bind(this));
        Socket.on('about', this.botAbout.bind(this));
        Socket.on('help', this.botHelp.bind(this));
        Socket.on('say', this.botSay.bind(this));
        Socket.on('time', this.botTime.bind(this));

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
            users
        } = this.state;
        var {
            user
        } = data;
        this.setState({
            users,
            user: data
        });
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
            text: 'Here are some of my commands!'
        }, {
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! help --> well you you\'re there! |'
        }, {
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! about --> I\'ll give you a general rundown of where you are at! |'
        }, {
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! say <something> --> and hopefully it\'s cool... |'
        }, {
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! time --> I\'ll give you the time! |'
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

    botTime() {
        var {
            messages
        } = this.state;
        messages.push({
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text:'Today\'s date: ' + Date()
        });


        this.setState({
            messages
        });

    }

    userJoined(data) {
        console.log('UJ - ' +JSON.stringify(data));
        var {
            users,
            messages
        } = this.state;
        users.push(data['user']);
        messages.push({
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: data['user'] + ' Joined'
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
                    'message': message
                });
            }
            else {
                alert('Log in if you want to send some messages!')
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
                            <UserList users={this.state.users} total={this.state.usersConnected}/>
                        </Col>
                        <Col md={10}>
                            <MessageList messages={this.state.messages}/>
                        </Col>
                    </Row>
                </Grid>
                <MessageBox onMessageSubmit={this.handleMessageSubmit.bind(this)} user={this.state.user} />
            </div>
        )
    }
}

export default ChatMain;
