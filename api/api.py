from flask import current_app, jsonify, request
from app import create_app, db
from models import Review, Restaurant, reviews_schema
import json

# Create an application instance
app = create_app()

# Define a route to fetch the avaialable articles

@app.route("/reviews", methods=["GET"], strict_slashes=False)
def reviews_by_id():
	business_id = request.args.get("business_id")
	print("Business ID:", business_id)

	reviews = Restaurant.query.filter_by(business_id=business_id)
	results = reviews_schema.dump(reviews)[0]
	
	reviews_list = []
	for review in results["reviews"]:
		reviews_list.append(
			{
				"id_restaurant": review.id_restaurant,
				"stars": review.stars,
				"text": review.text,
				"date": review.date,
				"sentiment": review.sentiment,
			}
		)

	results["reviews"] = reviews_list

	return jsonify(results)


if __name__ == "__main__":
	app.run(debug=True)