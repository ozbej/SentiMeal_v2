import sqlite3
import pandas as pd

connection = sqlite3.connect('data/database.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

df = pd.read_csv('data/yelp_reviews_restaurants_sampled_15000.csv')

for i, row in df.iterrows():
    cur.execute("INSERT INTO reviews (business_id, business_name, business_address, business_city, business_state, business_postal_code, business_latitude, business_longitude, business_stars, review_stars, review_text, review_date, review_sentiment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (row["business_id"], row["name"], row["address"], row["city"], row["state"], row["postal_code"], row["latitude"], row["longitude"], row["stars"], row["review_stars"], row["text"], row["date"], row["sentiment"])
            )

connection.commit()
connection.close()
