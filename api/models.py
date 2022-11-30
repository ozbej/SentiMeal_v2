from app import db, ma
from datetime import datetime


class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, primary_key=False)
    business_name = db.Column(db.Text,nullable=False)
    review_text = db.Column(db.Text, nullable=True)
    review_sentiment = db.Column(db.Text, nullable=True)


    def __repr__(self):
        return "<Reviews %r>" % self.business_name

# Generate marshmallow Schemas from your models
class ReviewsShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id", "business_id","business_name", "review_text", "review_sentiment")


review_schema = ReviewsShema()
reviews_schema = ReviewsShema(many=True)