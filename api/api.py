from flask import current_app, jsonify, request
from app import create_app, db
from models import Restaurant, reviews_schema
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
from collections import Counter

# Create an application instance
app = create_app()

# Define a route to fetch the avaialable articles

@app.route("/reviews", methods=["GET"], strict_slashes=False)
def reviews_by_id():
	business_id = request.args.get("business_id")
	print("Business ID:", business_id)

	reviews = Restaurant.query.filter_by(business_id=business_id)
	results = reviews_schema.dump(reviews)[0]

	stop_words = set(stopwords.words('english'))
	stop_words.update(["n't", "'s"])

	negative_text = []
	positive_text = []
	
	reviews_list = []
	for review in results["reviews"]:
		reviews_list.append(
			{
				"id_restaurant": review.id_restaurant,
				"stars": review.stars,
				"text": review.text,
				"date": review.date,
				"sentiment": review.sentiment,
				"prob_neg": review.prob_neg,
				"prob_pos": review.prob_pos,
			}
		)

		# Generate data for wordcloud
		filtered_text = [w for w in word_tokenize(review.text) if not w.lower() in stop_words and not w.lower() in string.punctuation]

		if int(review.sentiment) == 0: negative_text += filtered_text
		elif int(review.sentiment) == 2: positive_text += filtered_text

		counts_negative = [{"text": k, "value": v} for k, v in Counter(negative_text).items()]
		counts_positive= [{"text": k, "value": v} for k, v in Counter(positive_text).items()]


	results["reviews"] = reviews_list
	results["counts_negative"] = counts_negative
	results["counts_positive"] = counts_positive

	return jsonify(results)


if __name__ == "__main__":
	app.run(debug=True)