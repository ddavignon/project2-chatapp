import urllib2, unittest, models
from flask import Flask
from flask_testing import LiveServerTestCase
from app import app

class ServerIntegrationTest(LiveServerTestCase):
    def create_app(self):
        return app
        
    def test_server_is_up_and_running(self):
        response = urllib2.urlopen(self.get_server_url())
        self.assertEqual(response.code, 200)
        
class MessageDatabaseTest(LiveServerTestCase):
    SQLALCHEMY_DATABASE_URI = 'postgresql://'
    TESTING = True
    
    def create_app(self):
        return app
        
    def test_message_database(self):
        test_msg = models.Message('test','test','test')
        models.db.session.add(test_msg)
        models.db.session.commit()
        models.db.session.close()
        
if __name__ == '__main__':
    unittest.main()