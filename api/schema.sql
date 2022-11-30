DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    business_id TEXT NOT NULL,
    business_name TEXT NOT NULL,
    business_address TEXT,
    business_city TEXT,
    business_state TEXT,
    business_postal_code TEXT,
    business_latitude TEXT,
    business_longitude TEXT,
    business_stars INTEGER,
    review_stars INTEGER,
    review_text TEXT,
    review_date TEXT,
    review_sentiment TEXT
);