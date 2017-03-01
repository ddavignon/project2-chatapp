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
        
class checkFilePath(unittest.TestCase):
    def test_index(self):
        r = os.path.isfile('./templates/index.html')
        self.assertEqual(r, True)
        
# class ModelTest(unittest.TestCase):
#     def test_model_saves(self):
#         mymodel = models.Message('https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiYp6bU6LTSAhVFzFQKHUBQADIQjRwIBw&url=http%3A%2F%2Fxiostorage.com%2Feverythings-a-test-with-data-storage-performance%2F&bvm=bv.148441817,d.cGw&psig=AFQjCNH4mvyHEabYxzqQDngsjw7BlJHL0Q&ust=1488440917341109','test-user','A message about bacon')
#         models.db.session.add(mymodel)
#         models.db.session.commit()
#         self.assertEqual(mymodel.id, True)
        
if __name__ == '__main__':
    unittest.main()