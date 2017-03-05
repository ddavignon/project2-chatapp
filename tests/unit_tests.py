import unittest, os
import app, models

class ChatBotResponseTest(unittest.TestCase):
    def test_chat_about(self):
        r = app.checkBotMessage('!! about')[0]
        self.assertEqual(r, 'about')
        
    def test_chat_help(self):
        r = app.checkBotMessage('!! help')[0]
        self.assertEqual(r, 'help')
    
    def test_chat_date(self):
        r = app.checkBotMessage('!! date')[0]
        self.assertEqual(r, 'date')
        
    def test_chat_hi(self):
        r = app.checkBotMessage('!! hi')[0]
        self.assertEqual(r, 'hi')
        
    def test_chat_say(self):
        r = app.checkBotMessage('!! say This is a test')
        self.assertIsInstance(r, tuple)
        
    def test_chat_error(self):
        r = app.checkBotMessage('tomato')
        self.assertTupleEqual(r, ('say', 'are you sure about that last message?'))
        
class checkFilePath(unittest.TestCase):
    def test_index(self):
        r = os.path.isfile('./templates/index.html')
        self.assertEqual(r, True)
        
    def test_script_exists(self):
        r = os.path.isfile('./static/script.js')
        self.assertEqual(r, True)
        
    def test_background_image(self):
        r = os.path.isfile('./static/images/theCity.png')
        self.assertEqual(r, True)
        
class ModelTest(unittest.TestCase):
     def test_model_saves(self):
         db_values = []
         db_values = models.Message.query.all()
         self.assertGreater(len(db_values), 0)
        
if __name__ == '__main__':
    unittest.main()