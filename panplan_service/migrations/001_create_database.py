steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE recipes (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            image_url TEXT,
            ingredients TEXT NOT NULL,
            steps TEXT NOT NULL,
            creator_id INTEGER REFERENCES users("id") NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE recipes;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE meals (
            id SERIAL PRIMARY KEY NOT NULL,
            date_int INTEGER NOT NULL,
            date DATE,
            recipe_id INTEGER REFERENCES recipes("id") NOT NULL,
            user_id INTEGER REFERENCES users("id") NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE meals;
        """
    ]
]
