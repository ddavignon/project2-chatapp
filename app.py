import os
import json
import eventlet
eventlet.monkey_patch()
from flask import Flask, render_template
from flask_socketio import SocketIO, send
# from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SECRET_KEY'] = 'Sup3rC00lS3cr3+!'
socketio = SocketIO(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ubuntu@ddavignon-dustindavignon.c9users.io/messages'
# db = SQLAlchemy(app)

# class ChatHistory(db.Model):
#     id = db.Column('id', db.Integer, primary_key=True)
#     message = db.Column('message', db.String(500))


# Route
@app.route('/')
def index():
    # messages = ChatHistory.query.all()
    return render_template('index.html')#, messages=messages)

#on connection
connected=0
@socketio.on('connect')
def on_connect():
    print 'Someone connected!'
    global connected
    connected += 1
    socketio.emit('update', { 'count': connected})

@socketio.on('message')
def handleMessage(message):
    print('Message' + message)
    # message = ChatHistory(message=msg)
    # db.session.add(message)
    # db.session.commit()
    
    socketio.emit('message', {'data': 'got it!'})

@socketio.on('send:message')
def sendMessage(message):
    print 'sent message', message
    socketio.emit('send:message', message, broadcast=True)

if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )