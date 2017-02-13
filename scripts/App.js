import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

import { Socket } from './Socket';

import ChatMain from './Components/ChatMain';

const styles =  {
  textAlign: 'left'
}

class App extends Component {
    
  render() {
        return (
            <MuiThemeProvider>
              <div className="App">
                <AppBar
                  style={styles}
                  title="ChittChatt"
                  showMenuIconButton={false}
                  iconElementRight={
                    <div>
                      <div><a href="#" onclick="signOut();">Sign out</a></div>
                      <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
                    </div>}
                />
                <ChatMain />
              </div>
            </MuiThemeProvider>
        )
    }
}

export default App;
