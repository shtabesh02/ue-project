from app.models import db, Restaurant, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    restaurant1 = Restaurant(user_id=1, name='Restaurant One', description='Description One', address='Address One', city='City One', country='Country One', img_url='img_url_one')
    restaurant2 = Restaurant(user_id=2, name='Restaurant Two', description='Description Two', address='Address Two', city='City Two', country='Country Two', img_url='img_url_two')
    restaurant3 = Restaurant(user_id=2, name='Restaurant Three', description='Description Three', address='Address Three', city='City Three', country='Country Three', img_url='img_url_three')


    db.session.add(restaurant1)
    db.session.add(restaurant2)
    db.session.add(restaurant3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))

    db.session.commit()

