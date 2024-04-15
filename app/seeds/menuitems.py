from app.models import db, MenuItem, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_menuitems():
    menuitems1 = MenuItem(restaurant_id=1, food_name='French Fries', description='Description One', price = 3.69, img_url='img_url_one')
    menuitems2 = MenuItem(restaurant_id=1, food_name='McNuggets', description='Description Two',price = 6.19,img_url='img_url_two')
    menuitems3 = MenuItem(restaurant_id=2, food_name='Tacos', description='Description Three', price = 8.9, img_url='img_url_three')


    db.session.add(menuitems1)
    db.session.add(menuitems2)
    db.session.add(menuitems3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_menuitems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menuitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menuitems"))

    db.session.commit()
