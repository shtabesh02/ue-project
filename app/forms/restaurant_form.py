from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Restaurant


class RestaurantForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=100)])
    description = StringField('description', validators=[DataRequired(), Length(max=255)])
    address = StringField('address', validators=[DataRequired(), Length(max=255)])
    city = StringField('city', validators=[DataRequired(), Length(max=255)])
    country = StringField('country', validators=[DataRequired(), Length(max=255)])
    img_url = StringField('img_url', validators=[DataRequired(), Length(max=255)])
