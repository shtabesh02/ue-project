from .db import db, environment, SCHEMA, add_prefix_for_prod
from .menu_item import MenuItem

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String)
    description = db.Column(db.String)
    address = db.Column(db.String)
    city = db.Column(db.String)
    country = db.Column(db.String)
    img_url = db.Column(db.String)

    #Many-to-One relationship with User
    user = db.relationship("User", back_populates="restaurants")

    #one-to-many relationship with menuitems
    menuitems = db.relationship("MenuItem", back_populates="restaurant")

    def to_dict(self, include_menuitems=False):
        dic = {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'address': self.address,
            'city': self.city,
            'country': self.country,
            'img_url': self.img_url
        }

        if include_menuitems:
            dic['menuitems'] = [item.to_dict() for item in self.menuitems]

        return dic
