INSERT INTO users (shelf_name, email, password_hash)
VALUES
('Moonlight Reads', 'ayesha@gmail.com', 'hashed_pw_1'),
('Fantasy Corner', 'hamza@hotmail.com', 'hashed_pw_2'),
('Quiet Library', 'sara@yahoo.com', 'hashed_pw_3');

INSERT INTO books
(user_id, book_name, author_name, review, spine_color, spine_design)
VALUES

(1,
'Harry Potter',
'J.K. Rowling',
'A comforting fantasy reread.',
'purple',
'stars'),

(1,
'The Hobbit',
'Tolkien',
NULL,
'green',
'minimal'),

(2,
'Dune',
'Frank Herbert',
'Complex worldbuilding but excellent.',
'brown',
'vintage'),

(2,
'Dracula',
'Bram Stoker',
NULL,
'red',
'gothic'),

(2,
'Frankenstein',
'Mary Shelley',
'Surprisingly emotional.',
'black',
'classic'),

(3,
'Pride and Prejudice',
'Jane Austen',
'Very witty and enjoyable.',
'pink',
'floral'),

(3,
'1984',
'George Orwell',
NULL,
'gray',
'minimal');