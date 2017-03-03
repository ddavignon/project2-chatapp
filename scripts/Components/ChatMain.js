import React, {
    Component
}
from 'react';
import {
    Grid,
    Col,
    Row,
    ButtonGroup,
    Jumbotron,
}
from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

import MessageBox from './MessageBox';
import MessageList from './MessageList';
import UserList from './UserList';

import {
    Socket
}
from '../Services/Socket';

const styles = {
    appBar: {
        textAlign: 'left'
    },
    login: {
        marginTop: '5em'
    }
}



class ChatMain extends Component {

    constructor() {
        super();
        this.state = {
            messages: [{
                'img': '',
                'user': 'This is only the beginning!',
                'text': 'This is the beginning of chat history for this room!'
            }],
            users: [
                "Chitt Bot"
            ],
            text: '',
            user: ['img': '', 'user': ''],
            usersConnected: "",
            isLoggedIn: false
        }
        Socket.emit('get:messages');
    }

    componentDidMount() {
        FB.getLoginStatus((response) => {
            if (response.status == 'connected') {
                Socket.emit('FB-user', {
                    'facebook_user_token': response.authResponse.accessToken
                });
                this.setState({
                    isLoggedIn: true
                });
            }
        });
        FB.Event.subscribe('auth.logout',
            this.onLogout.bind(this));
        FB.Event.subscribe('auth.statusChange',
            this.onStatusChange.bind(this));

        Socket
            .on('connect', function() {
                console.log('Connecting to the server!');
            });
        Socket.once('event', this.loadMessages.bind(this));
        Socket.on('update', this.updateUsersConnected.bind(this));
        Socket.on('init', this.initialize.bind(this));
        Socket.on('send:message', this.messageRecieve.bind(this));
        Socket.on('user:join', this.userJoined.bind(this));
        Socket.on('user:left-client', this.userLeft.bind(this));
        Socket.on('about', this.botAbout.bind(this));
        Socket.on('help', this.botHelp.bind(this));
        Socket.on('say', this.botSay.bind(this));
        Socket.on('date', this.botDate.bind(this));
        Socket.on('hi', this.botHi.bind(this));

    }

    onStatusChange(response) {
        console.log(response);
        if (response.status === "connected") {
            Socket.emit('FB-user', {
                'facebook_user_token': response.authResponse.accessToken,
            });
            this.setState({
                isLoggedIn: true
            });
        }
    }

    onLogout(response) {
        console.log('logout', response, 'user', this.state.user)
        Socket.emit('user:left', this.state.user);
        this.setState({
            isLoggedIn: false
        });
    }

    loadMessages(message) {
        //console.log('user', users)
        var {
            messages
        } = this.state;
        //console.log('messages', message);
        for (var data of message) {
            //console.log(data);
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
            text: 'Here are some of my commands'
        }, {
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! help --> well you you\'re there!'
        }, {
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! about --> I\'ll give you a general rundown of where you are at!'
        }, {
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! say <something> --> and hopefully it\'s cool...'
        }, {
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! date --> I\'ll give you the date and time!'
        }, {
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! hi --> Just say hi!'
        }, {
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: '!! Chuck --> Get a random Chuck Norris quote to brighten your day!'
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

    botDate() {
        var {
            messages
        } = this.state;
        messages.push({
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: 'Today\'s date: ' + Date()
        });
        this.setState({
            messages
        });
    }

    botHi() {
        var {
            messages
        } = this.state;
        messages.push({
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: 'Hi ' + this.state.user.user + '! How are you doing?'
        });
        this.setState({
            messages
        });
    }

    userJoined(data) {
        console.log('UJ - ' + JSON.stringify(data));
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

        console.log('UL - ' + JSON.stringify(data));
        var {
            users,
            messages
        } = this.state;
        var index = users.indexOf(data['user']);
        users.splice(index, 1);
        messages.push({
            img: '../../static/bot.jpeg',
            user: 'CHITT BOT',
            text: data['user'] + ' Left'
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
            <MuiThemeProvider>
              <div className="App">
                <AppBar
                  style={styles.appBar}
                  title="ChittChatt"
                  showMenuIconButton={false}
                  iconElementRight={
                        <div
                          className="fb-login-button"
                          data-max-rows="1"
                          data-size="medium"
                          data-show-faces="false"
                          data-auto-logout-link="true">
                        </div>
                  }
                />
                <div className = "chatMain" >
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
                    <MessageBox
                        onMessageSubmit = {
                            this.handleMessageSubmit.bind(this)
                        }
                        user = {
                            this.state.user
                        }
                        />
                </div>
              </div>
            </MuiThemeProvider>
        )
    }
}
export default ChatMain;
