import os
import json
import re
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
    
    socketio.emit('user:join', { 'name': 'userPlaceholder'})
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
    

# get messages
@socketio.on('get:messages')
def get_messages():
    print "serving messsages to user"
    # query the database
    data = models.History.query.all();
    all_messages = [{'img': x.img, 'user': x.user, 'text': x.message}  for x in data]
    socketio.emit('event', all_messages)


# on send message
botSignal = re.compile('[!!]')
@socketio.on('send:message')
def sendMessage(msg):
    # console log message
    print 'sent message', msg['img'], msg['user'], msg['text']
    
    if re.match(botSignal, msg['text'].strip()[:2]):
        print 'bot!'
        try:
            botCommand = msg['text'].split()[1]
            if 'about' in botCommand:
                print 'about'
                socketio.emit('about')
            elif 'help' in botCommand:
                print 'help'
                socketio.emit('help')
            elif 'say' in botCommand:
                print 'say'
                socketio.emit('say', msg['text'].replace('!! say ', '' ))
            else:
                socketio.emit('say', 'What do you mean? Try using !! help.')
        except:
            socketio.emit('say', 'are you sure about that last message?')
    else:
        # broadcast message to main chatroom
        socketio.emit('send:message', msg, broadcast=True)
        # add message to database
        text = models.History(msg['img'], msg['user'], msg['text'])
        models.db.session.add(text)
        models.db.session.commit()
        models.db.session.close()

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )