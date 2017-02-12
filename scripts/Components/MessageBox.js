import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles ={
    form: {
        position: 'fixed',
        bottom: '0',
        width: '100%'
    },
    messagBox: {
        paddingLeft: '10px',
    }
}

class MessageBox extends Component {
    render() {
        return (
            <form action="" style={styles.form}>
                <div className="pull-left col-md-8">
                    <TextField
                      style={styles.messagBox}
                      hintText="Message"
                      type="text"
                      fullWidth={true}
                      multiLine={true}
                      />
                </div>
                <div className="pull-right col-md-4">
                    <RaisedButton 
                      label="Send" 
                      secondary 
                      />
                </div>
            </form>
        );
    }
    
}

export default MessageBox;