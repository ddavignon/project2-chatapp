import os
import json
import eventlet
eventlet.monkey_patch()
from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO, send
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SECRET_KEY'] = 'Sup3rC00lS3cr3+!'
socketio = SocketIO(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ubuntu:chat@localhost/chat'
db = SQLAlchemy(app)

class History(db.Model):
     id = db.Column('id', db.Integer, primary_key=True)
     user = db.Column('user', db.String(50))
     message = db.Column('message', db.String(500))

# Route
@app.route('/')
def index():
    return render_template('index.html')#, messages=messages)

# on connection
totalUsersConnected=0
@socketio.on('connect')
def on_connect():
    # count connected user
    print 'Someone connected!'
    global totalUsersConnected
    totalUsersConnected += 1
    
    # query the database
    data = History.query.all();
    for message in data:
        socketio.emit('event', {'user': message.user, 'text': message.message})
    print data
        
        # notify of user connected    
        #socketio.emit('user:join', { 'name': message.user})
    
    # update total connected users
    socketio.emit('update', totalUsersConnected)

# on disconnnect
@socketio.on('disconnect')
def on_disconnect():
    # remove user from count
    print('Client disconnected')
    global totalUsersConnected
    totalUsersConnected -= 1

    # nofify of user disconnect
    socketio.emit('user:left', { 'name': 'userLeftPlaceholder'})
    
    # update total connected users
    socketio.emit('update', totalUsersConnected)

# on send message
@socketio.on('send:message')
def sendMessage(msg):
    # console log message
    print 'sent message', msg['text']
    
    # broadcast message to main chatroom
    socketio.emit('send:message', msg, broadcast=True)
    
    # add message to database
    message = History(user="dbPlaceHolder", message=msg['text'])
    db.session.add(message)
    db.session.commit()

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )