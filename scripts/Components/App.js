import React, {
  Component
}
from 'react';
import {
  ButtonGroup,
  Jumbotron,
  Grid
}
from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

import ChatMain from './ChatMain';
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {        // check login status
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
    Socket.emit('user:left');
    this.setState({
      isLoggedIn: false
    });
  }

  render() {
    // const isLoggedIn = this.state.isLoggedIn;
    // let mainWindow = null;
    // if (isLoggedIn) {
    //   mainWindow = <ChatMain>{this.props.children}</ChatMain>;
    // }
    // else {
    //   mainWindow = <Grid><Jumbotron className="text-center" style={styles.login}><h1>Welcome to Chitt Chatt!</h1><p>Log in please!</p></Jumbotron></Grid>;
    // }
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
                <ChatMain>{this.props.children}</ChatMain>
                {//mainWindow
                }
              </div>
            </MuiThemeProvider>
    )
  }
}

export default App;
