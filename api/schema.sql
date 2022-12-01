DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS reviews;

CREATE TABLE restaurants (
    business_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    latitude TEXT,
    longitude TEXT,
    stars TEXT
);

CREATE TABLE reviews (
    id_review INTEGER PRIMARY KEY AUTOINCREMENT,
    id_restaurant TEXT,
    stars TEXT,
    text TEXT,
    date TEXT,
    sentiment TEXT,
    FOREIGN KEY (id_restaurant) REFERENCES restaurants(business_id)
);