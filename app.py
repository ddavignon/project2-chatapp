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

import models

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
    data = models.History.query.all();
    all_messages = [{'img': x.img, 'user': x.user, 'text': x.message}  for x in data]
    socketio.emit('event', all_messages)
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
    socketio.emit('user:left', { 'name': 'userPlaceholder'})
    
    # update total connected users
    socketio.emit('update', totalUsersConnected)

# on send message
@socketio.on('send:message')
def sendMessage(msg):
    # console log message
    print msg
    print 'sent message', msg['img'], msg['user'], msg['text']
    
    # broadcast message to main chatroom
    socketio.emit('send:message', msg, broadcast=True)
    
    # add message to database
    text = models.History(msg['img'], msg['user'], msg['text'])
    models.db.session.add(text)
    models.db.session.commit()

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )