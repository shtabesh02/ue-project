"""create_users_table

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('address', sa.String(length=40), nullable=False),
    sa.Column('city', sa.String(length=40), nullable=False),
    sa.Column('country', sa.String(length=40), nullable=False),
    sa.Column('phone', sa.String(length=40), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )


    op.create_table('restaurants',
    sa.Column('id', sa.Integer()),
    sa.Column('user_id', sa.Integer()),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('address', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=40), nullable=False),
    sa.Column('country', sa.String(length=255), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    )

    op.create_table('menuitems',
    sa.Column('id', sa.Integer()),
    sa.Column('restaurant_id', sa.Integer()),
    sa.Column('food_name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=1000)),
    sa.Column('price', sa.Float, nullable=False),
    sa.Column('img_url', sa.String(length=1000), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['restaurant_id'], ['restaurants.id'], ),
    )

    op.create_table('shoppingcarts',
    sa.Column('id', sa.Integer()),
    sa.Column('user_id', sa.Integer()),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    )

    op.create_table('cartitems',
    sa.Column('id', sa.Integer()),
    sa.Column('shopping_cart_id', sa.Integer()),
    sa.Column('menu_items_id', sa.Integer()),
    sa.Column('quantity', sa.Integer()),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['shopping_cart_id'], ['shoppingcarts.id'], ),
    sa.ForeignKeyConstraint(['menu_items_id'], ['menuitems.id'], ),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###qqqqqqqqq


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    op.drop_table('restaurants')
    op.drop_table('menuitems')
    # ### end Alembic commands ###
