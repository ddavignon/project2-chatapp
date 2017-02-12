import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles = {
    form: {
        position: 'fixed',
        bottom: '20px',
        width: '100%'
    },
    messageBox: {
        paddingLeft: '10px'
    },
    shadowBox: {
        paddingRight: '20px'
    },
    sendButton: {
        paddingTop: '.5em'
    }
}

class MessageBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var message = {
            "user": this.props.user,
            "text": this.state.text
        }
        this
            .props
            .onMessageSubmit(message);
        this.setState({"text": " "});
    }

    changeHandler(e) {
        this.setState({text : e.target.value });
    }

    render() {
        return (
        <form onSubmit={this.handleSubmit} style={styles.form} className="pull-right">
                <div className="col-md-9 col-md-offset-2">
                    <Paper zDepth={2} style={styles.shadowBox}>
                    <TextField
                      name="messages"
                      style={styles.messageBox}
                      placeholder="Message"
                      type="text"
                      fullWidth={true}
                      value={this.state.text}
                      onChange={this.changeHandler}
                      />
                      </Paper>
                </div>
                <div className="col-md-1" style={styles.sendButton}>
                    <RaisedButton
                      label="Send"
                      type="submit"
                      secondary
                      />
                </div>
            </form>
          );
    }

}

export default MessageBox;