import React, {
  Component
}
from 'react';
import {
  ButtonGroup
}
from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

import ChatMain from './Components/ChatMain';
import {
  Socket
}
from './Socket';;

const styles = {
  appBar: {
    textAlign: 'left'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
            // check login status
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
    this.setState({
      isLoggedIn: false
    });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let mainWindow = null;
    if (isLoggedIn) {
      mainWindow = <ChatMain />;
    }
    else {
      mainWindow = <h1>Log in please!</h1>;
    }
    return (
      <MuiThemeProvider>
              <div className="App">
                <AppBar
                  style={styles.appBar}
                  title="ChittChatt"
                  showMenuIconButton={false}
                  iconElementRight={
                    <div>{
                     // <div><a href="#" onclick="signOut();">Sign out</a></div>
                    }
                    <div style={styles.gSignIn}>
                      <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                    </div>
                    <div>
                        <div
                          className="fb-login-button"
                          data-max-rows="1"
                          data-size="medium"
                          data-show-faces="false"
                          data-auto-logout-link="true">
                        </div>
                      </div>
                    </div>
                  }
                />
                {mainWindow}
              </div>
            </MuiThemeProvider>
    )
  }
}

export default App;
