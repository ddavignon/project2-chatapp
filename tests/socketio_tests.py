import unittest
import app

class SocketIOTests(unittest.TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass
    
    # def test_on_connect(self):
    #     client = app.socketio.test_client(app.app)
    #     r = client.get_received()
    #     self.assertEqual(len(r), 1)
    #     client.disconnect();
        
if __name__ == '__main__':
    unittest.main()