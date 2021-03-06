CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_creation DATE  DEFAULT current_date
);

CREATE TABLE activitys (
    activity_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_time TIME NOT NULL,
    finish_time TIME NOT NULL,
    creation_time TIMESTAMP DEFAULT current_timestamp,
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
        ON DELETE CASCADE
);

CREATE TABLE user_activitys (
    user_activity_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    finish_time TIMESTAMP NOT NULL,
    activity_date DATE NOT NULL,
     FOREIGN KEY (user_id)
      REFERENCES users (user_id)
        ON DELETE CASCADE
);

CREATE TABLE refreshtokens (
  token_id serial PRIMARY KEY,
  user_id INT NOT NULL,
  token TEXT NOT NULL,
  FOREIGN KEY (user_id)
      REFERENCES users (user_id) 
        ON DELETE CASCADE
);


