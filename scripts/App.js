import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

import { Socket } from './Socket';

import ChatMain from './Components/ChatMain';

const styles =  {
  textAlign: 'left'
}

class App extends Component {

  constructor(){
    super();
    this.signOut = this.signOut.bind(this);
  }

  onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    };

   signOut() {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    //   console.log('User signed out.');
    // });
  }

    render() {
        return (
            <MuiThemeProvider>
              <div className="App">
                <AppBar
                  style={styles}
                  title="ChittChatt"
                  showMenuIconButton={false}
                  iconElementRight={<div><a href="#" onClick={this.signOut()}>Sign out</a><div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div><div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="false"></div></div>}
                />
                <ChatMain />
              </div>
            </MuiThemeProvider>
        )
    }
}

export default App;
