import unittest
import app

class SocketIOTests(unittest.TestCase):
    def test_on_connect(self):
        client = app.socketio.test_client(app.app)
        r = client.get_received()
        server_msg = r[0]
        self.assertEquals(server_msg['name'], 'server says hello')
        data = server_msg['args'][0]
        self.assertEquals(data['message'], 'Hello, client')
        print data
        
if __name__ == '__main__':
    unittest.main()