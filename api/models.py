from app import db, ma
from datetime import datetime


class Restaurant(db.Model):
    __tablename__ = "restaurants"
    business_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    address = db.Column(db.Text, nullable=True)
    city = db.Column(db.Text, nullable=True)
    state = db.Column(db.Text, nullable=True)
    postal_code = db.Column(db.Text, nullable=True)
    latitude = db.Column(db.Text, nullable=True)
    longitude = db.Column(db.Text, nullable=True)
    stars = db.Column(db.Text, nullable=True)
    reviews = db.relationship("Review", lazy="select", backref=db.backref("reviews", lazy="joined"))

class Review(db.Model):
    __tablename__ = "reviews"
    id_review = db.Column(db.Integer, primary_key=True)
    id_restaurant = db.Column(db.Integer, db.ForeignKey('restaurants.business_id'), nullable=False)
    stars = db.Column(db.Text,nullable=True)
    text = db.Column(db.Text, nullable=True)
    date = db.Column(db.Text, nullable=True)
    sentiment = db.Column(db.Text, nullable=True)
    prob_neg = db.Column(db.Text, nullable=True)
    prob_pos = db.Column(db.Text, nullable=True)


# Generate marshmallow Schemas from your models
class RestaurantsShema(ma.Schema):
    class Meta:
        fields = ("business_id", "name", "address", "city", "state", "postal_code", "latitude", "longitude", "stars", "reviews")

class ReviewsShema(ma.Schema):
    class Meta:
        fields = ("id_restaurant", "stars", "text", "date", "sentiment")

restaurant_schema = RestaurantsShema()
restaurants_schema = RestaurantsShema(many=True)

review_schema = RestaurantsShema()
reviews_schema = RestaurantsShema(many=True)