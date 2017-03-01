import os, json, re, requests
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


@socketio.on('connect')
def on_connect():
    # count connected user
    print 'Someone connected!'
    
    
connected_users = []
@socketio.on('FB-user')
def FB_user(data):
    #print data['facebook_user_token']
    response = requests.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture&access_token=' + data['facebook_user_token'])
    json = response.json()
    user = { 'img' : json['picture']['data']['url'], 'user': json['name'] }
    print user
    socketio.emit('init', user);
    
    global connected_users
    if not any(user == connected_user for connected_user in connected_users):
        print user['user'], ' vs ', connected_users
        connected_users.append(user['user'])
        # socketio.emit('user:join', {'img' : json['picture']['data']['url'], 'name': json['name']})
        socketio.emit('user:join', {'user':user['user']})
        print connected_users
        socketio.emit('update', len(connected_users))

@socketio.on('user:left')
def user_left(data):
    print 'user left', data
    global connected_users
    if any(data['user'] == connected_user for connected_user in connected_users):
        socketio.emit('user:left-client', {'user': data['user']})
        connected_users.remove(data['user'])
        # socketio.emit('user:join', {'img' : json['picture']['data']['url'], 'name': json['name']})
        print connected_users
        socketio.emit('update', len(connected_users))

# on disconnnect
@socketio.on('disconnect')
def on_disconnect():
    # remove user from count
    print('Client disconnected')

# get messages
@socketio.on('get:messages')
def get_messages():
    print "serving messsages to user"
    # query the database
    data = models.Message.query.all();
    all_messages = [{'img': x.img, 'user': x.user, 'text': x.message}  for x in data]
    socketio.emit('event', all_messages)


def checkBotMessage(botCommand):
    try:
        if 'about' in botCommand:
            print 'about'
            socketio.emit('about')
        elif 'help' in botCommand:
            print 'help'
            socketio.emit('help')
        elif 'say' in botCommand:
            print 'say'
            socketio.emit('say', msg['message']['text'].replace('!! say ', '' ))
        elif 'date' in botCommand:
            print 'date'
            socketio.emit('date')
        elif 'hi' in botCommand:
            print 'hi'
            socketio.emit('hi')
        else:
            socketio.emit('say', 'What do you mean? Try using !! help.')
    except Exception as err:
        print err
        socketio.emit('say', 'are you sure about that last message?')


# on send message
botSignal = re.compile('[!!]')
@socketio.on('send:message')
def sendMessage(msg):
    # console log message
    #print msg
    #print msg['facebook_user_token']
    response = requests.get('https://graph.facebook.com/v2.8/me?fields=id%2Cname%2Cpicture&access_token=' + msg['facebook_user_token'])
    json = response.json()
    user = { 'img' : json['picture']['data']['url'], 'user': json['name'] }
    print 'sent message', msg['message']['text'], user['img'], user['user']
    
    if re.match(botSignal, msg['message']['text'].strip()[:2]):
        print 'bot!'
        checkBotMessage(msg['message']['text'].split()[1])

    else:
        # broadcast message to main chatroom
        
        socketio.emit('send:message', {'text':msg['message']['text'], 'img':user['img'], 'user':user['user']}, broadcast=True)
        # add message to database
        text = models.Message(user['img'], user['user'], msg['message']['text'])
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