import unittest
import sys
import app

class SocketIOTests(unittest.TestCase):
    def test_on_connect(self):
        client = app.socketio.test_client(app.app)
        r = client.get_received()
        s_msg - r[0]
        self.assertEquals(s_msg['name'], 'connected')
        
    def test_emit(self):
        client = app.socketio.test_client(app.app)
        client.emit('test message', {
            'message' : 'This is a test message'
        })
        r = client.get_received
        self.assertEqual(len(r), 1)
    
if __name__ == '__main__':
    unittest.main()