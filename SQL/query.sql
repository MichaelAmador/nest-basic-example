CREATE TABLE todo
(
  id SERIAL PRIMARY KEY,
  idCategory INTEGER NOT NULL,
  description VARCHAR(255) NOT NULL,
  done BOOLEAN,
  deleted BOOLEAN DEFAULT FALSE,
  CONSTRAINT fk_category FOREIGN KEY (idCategory) REFERENCES category(idCategory)
);

CREATE TABLE category
(
  idCategory SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);