import React, {Component} from 'react';
import { Col } from 'react-bootstrap';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentSend from 'material-ui/svg-icons/content/send';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles = {
    form: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgb(0,188,212)',
        padding: '20px'
    },
    messageBox: {
        padding: '0 5px',
    },
    shadowBox: {
        paddingRight: '20px',
        marginLeft: '20px'
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
            "img" : "img-holder",
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
                <Col md={12} >
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
                </Col>
                {/*<Col md={1} >
                    <FloatingActionButton type="submit" secondary={true}>
                        <ContentSend />
                    </FloatingActionButton>
                </Col>*/}
            </form>
          );
    }

}

export default MessageBox;