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
    
      constructor(props) {
        super(props);
        this.state = {
          'data': ''
        };
      }
      
      componentDidMount() {
        Socket.on('update', (data) => {
          this.setState(data);
        });
      }
      
      handleToggle() {
        this.setState({ open: !this.state.open });
      }

    render() {
        return (
            <MuiThemeProvider>
              <div className="App">
               <div>
                 Data: {this.state.data}
               </div>
                <AppBar
                  style={styles}
                  title="Chatter"
                  showMenuIconButton={false}
                />
                <ChatMain />
                {this.props.children}
              </div>
            </MuiThemeProvider>
        )
    }
}

export default App;
