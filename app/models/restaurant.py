from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String)
    description = db.Column(db.String)
    address = db.Column(db.String)
    city = db.Column(db.String)
    country = db.Column(db.String)
    img_url = db.Column(db.String)

    #Many-to-One relationship with User
    user = db.relationship("User", back_populates="restaurants")
