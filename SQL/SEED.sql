-- CATEGORIES
INSERT INTO category (name) VALUES ('Personal');
INSERT INTO category (name) VALUES ('Work');

-- TODO
INSERT INTO todo (description, done, idCategory) VALUES ('Buy milk', false, 1);
INSERT INTO todo (description, done, idCategory) VALUES ('Buy bread', false, 1);
INSERT INTO todo (description, done, idCategory) VALUES ('Buy eggs', true, 1);
INSERT INTO todo (description, done, idCategory) VALUES ('Go to work', false, 2);
