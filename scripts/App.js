import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';

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
                  title="Chatter"
                  showMenuIconButton={false}
                />
                <ChatMain />
              </div>
            </MuiThemeProvider>
        )
    }
}

export default App;
