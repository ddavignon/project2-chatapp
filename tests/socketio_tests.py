import unittest
import sys
import app

class SocketIOTests(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass
    
    def test_on_connect(self):
        client = app.socketio.test_client(app.app)
        r = client.get_received()
        s_msg = r[0]
        self.assertEquals(s_msg['name'], 'connected!')
        
    def test_emit(self):
        client = app.socketio.test_client(app.app)
        fake_message_array = [{'this': 'is', 'a': 'test'}]
        client.emit('event', fake_message_array)
        r = client.get_received
        self.assertIsInstance(r, object)
        
    
if __name__ == '__main__':
    unittest.main()