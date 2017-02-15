import app
from flask_sqlalchemy import SQLAlchemy

app.app.config['SQLALCHEMY_DATABASE_URI'] = os.environ('DATABASE_URL')#'postgresql://dustin:potato@localhost/postgres'
db = SQLAlchemy(app.app)

class History(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    img = db.Column('img', db.String(100))
    user = db.Column('user', db.String(50))
    message = db.Column('message', db.String(500))
     
    def __init__(self, i, u, t):
        self.img = i
        self.user = u
        self.message = t
         
    def __repr__(self):
         return '<User> ' +  self.user + ' <Message> ' + self.message