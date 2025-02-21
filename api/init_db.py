import sqlite3
import pandas as pd

connection = sqlite3.connect('data/database_graz.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

df = pd.read_csv('data/graz_reviews_restaurants.csv')

# Insert into "restaurants" table
df_groups = df.groupby("business_id")
for name, group in df_groups:
    cur.execute("INSERT INTO restaurants (business_id, name, address, city, state, postal_code, latitude, longitude, stars) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (group.iloc[0]["business_id"], group.iloc[0]["name"], group.iloc[0]["address"], group.iloc[0]["city"], group.iloc[0]["state"], group.iloc[0]["postal_code"], group.iloc[0]["latitude"], group.iloc[0]["longitude"], group.iloc[0]["stars"])
            )

for i, row in df.iterrows():
    cur.execute("INSERT INTO reviews (id_restaurant, stars, text, date, sentiment, prob_neg, prob_pos) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (row["business_id"], row["review_stars"], row["text"], row["date"], row["sentiment"], row["prob_neg"], row["prob_pos"])
            )

connection.commit()
connection.close()
