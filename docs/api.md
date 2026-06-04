# API Documentation

## Overview
| id | API  | Description | Status |
|--|-------|----------|---|
| 1 | POST /auth/register | To register new users | Complete |
| 2 | POST /auth/login | To login new users | Complete |
| 3 | POST /auth/logout | Allow users to log out of existing session | Complete |
| 4 | GET /user/current | Allow system to retrieve current user's info |Complete |
| 5 | POST /books | Allows users to add a new book | Complete |
| 6 | GET /books | Allows users to view all the books | Complete |
| 7 | GET /books/:id  | Allows users to view a specific book | Complete |
| 8 | PATCH /books/:id | Allows user to update one or more fields of an existing book |Complete |
| 9 | DELETE /books/:id | Allows users to remove a new book | Complete |
| 10 | GET /shelves | Allows users to view other users' shelves collectievly | Complete |
| 11 | GET /shelves/:id | Allow users to view specific users' shelves | Complete |
| 12 | GET / | landing page of application |
| 13 | PATCH /user/shelf | Allow users to edit their  shelf name | Complete |
| 14 | DELETE /user/current | Allow users to delete their profile |
| 15 | GET /error | Users redirected here if bad api request |
| 16 | GET /shelves/:id/:bookId | To view specific user's books and their reviews (if applicabe) |
| 17 | PATCH /user/email | Allow users to edit their email | Complete |
| 18 | PATCH /user/password | Allow users to edit their password |
| 19 | PATCH /user/privacy | Allow users to toggle their privacy state from public to private, vice versa |
| 20 | GET /books/search?q=keyword | Allows users to search books by title or author name |
| 21 | GET /books/filter?hasReview | Allows users to filter based on review presence |
## 1: Register User

POST /auth/register <br>
To register new users

#### Request Body

```json
{
  "email": "user@gmail.com",
  "password": "password123",
  "shelf_name": "Fantasy Shelf"
}
```

#### Success Response
201 created
```json
{
  "message": "User created successfully"
}
```

#### Error Response

```json
{
  "message": "Error during user registration"
}
```


## 2: Login User

POST /auth/login <br>
To log user in to their account
### Request Body

```json
{
  "email": "user@gmail.com",
  "password": "password123",
}
```
#### Sucess Response
Status Code:
200 OK

```json
{
  "message": "Login successful"
}
```

#### Error Responses

401 Unauthorized

```json
{
  "message": "Invalid credentials"
}
```

500 Server Error

```json
{
  "message": "Error during user login. Please try again"
}
```
---

## 3: Logout User

POST /auth/logout <br>
Allows users to logout of their current session and clear cookies and invalidate auth token.

### Authentication Required
Yes

### Success Response

200 OK

```json
{
  "message": "Logout successful"
}
```

### Error Responses

401 Unauthorized

```json
{
  "message": "User is not authenticated"
}
```

500 Server Error

```json
{
  "message": "Error during logout"
}
```

---

## 4: Get Current User

GET /user/current <br>
Allows system to retrieve current user's information.

### Authentication Required
Yes

### Success Response

200 OK

```json
{
  "id": 1,
  "email": "user@gmail.com",
  "shelf_name": "Fantasy Shelf"
}
```

### Error Responses

401 Unauthorized

```json
{
  "message": "User is not authenticated"
}
```

500 Server Error

```json
{
  "message": "Error retrieving user information"
}
```

---

## 5: Add Books

POST /books <br>
Allows users to add a new book.

### Authentication Required
Yes

#### Request Body

```json
{
  "book_name": "Book ABC",
  "author_name": "Author XYZ",
  "review": "My favorite book of all time",
  "spine_color": "Red",
  "spine_design": "waves"
}
```

### Success Response

201 Created

```json
{
  "message": "Successfully added book."
}
```

### Error Responses

400 Bad Request

```json
{
  "message": "Invalid book data"
}
```

401 Unauthorized

```json
{
  "message": "User is not authenticated"
}
```

500 Server Error

```json
{
  "message": "Error during adding book. Please try again"
}
```

---

## 6 : View All Books

GET /books <br>
Allow users to view all books on their shelf.

### Authentication Required
Yes

### Success Response

200 OK

```json
[
  {
    "id": 1,
    "book_name": "Harry Potter",
    "author_name": "J.K. Rowling"
  }
]
```

### Error Responses

401 Unauthorized

```json
{
  "message": "User is not authenticated"
}
```

500 Server Error

```json
{
  "message": "Error during books retrieval"
}
```

---

## 7: View Specific Book

GET /books/:id <br>
Allows users view specific books on their shelf.

### Authentication Required
Yes

### URL Parameters

| Parameter | Type | Description |
|---|---|---|
| id | Integer | ID of the book |

### Success Response

200 OK

```json
{
  "id": 3,
  "book_name": "Dracula",
  "author_name": "Bram Stoker",
  "review": "Classic gothic horror.",
  "spine_color": "Red",
  "spine_design": "gothic"
}
```

### Error Responses

401 Unauthorized

```json
{
  "message": "User is not authenticated"
}
```

404 Not Found

```json
{
  "message": "Book not found"
}
```

500 Server Error

```json
{
  "message": "Error during book retrieval. Please try again"
}
```

---

## 8: Edit Book

PATCH /books/:id <br>
Allows user to update one or more fields of an existing book.

### Authentication Required
Yes

### URL Parameters

| Parameter | Type | Description |
|---|---|---|
| id | Integer | ID of the book to update |

### Request Body

All fields are optional.

```json
{
  "book_name": "New Title",
  "author_name": "New Author",
  "review": "Updated review"
}
```

### Validation Rules

- `book_name`: 0-30 characters
- `author_name`: 0-30 characters
- `review`: 0-1300 characters

### Success Response

200 OK

```json
{
  "message": "Book updated successfully"
}
```

### Error Responses

400 Bad Request

```json
{
  "message": "Invalid book data"
}
```

401 Unauthorized

```json
{
  "message": "User is not authenticated"
}
```

403 Forbidden

```json
{
  "message": "Unauthorized to edit this book"
}
```

404 Not Found

```json
{
  "message": "Book not found"
}
```

500 Server Error

```json
{
  "message": "Error during book update"
}
```

---

## 9: Delete Books

DELETE /books/:id <br>
Allows users to remove a book.

### Authentication Required
Yes

### URL Parameters

| Parameter | Type | Description |
|---|---|---|
| id | Integer | ID of the book |

### Success Response

200 OK

```json
{
  "message": "Successfully deleted book."
}
```

### Error Responses

401 Unauthorized

```json
{
  "message": "User is not authenticated"
}
```

403 Forbidden

```json
{
  "message": "Unauthorized to delete this book"
}
```

404 Not Found

```json
{
  "message": "Book not found"
}
```

500 Server Error

```json
{
  "message": "Error during book deletion. Please try again"
}
```

---

## 10: Browse Other Shelves

GET /shelves <br>
Allows users to view other users' shelves collectively. <br>
Only if user privacy status is public. <br>
Only shelf names to be shown. 

### Success Response

200 OK

```json
[
  {
    "id": 1,
    "shelf_name": "Fantasy Shelf"
  },
  {
    "id": 2,
    "shelf_name": "Moonlight Reads"
  }
]
```

### Error Responses

500 Server Error

```json
{
  "message": "Error retrieving shelves"
}
```

---

## 11: Browse Specific User Shelf

GET /shelves/:id <br>
Allow users to view specific users' shelves.
Only if user privacy status is public. 

### URL Parameters

| Parameter | Type | Description |
|---|---|---|
| id | Integer | ID of the specific user's shelf |

### Success Response

200 OK

```json
{
  "id": 2,
  "shelf_name": "Moonlight Reads",
  "books": [
    {
      "book_name": "Dune"
    }
  ]
}
```

### Error Responses

404 Not Found

```json
{
  "message": "Shelf not found"
}
```

500 Server Error

```json
{
  "message": "Error retrieving shelf"
}
```
## 12: Landing page of application

GET / <br>
Landing page / entry point of application. User can have option to login, register, or browse as guest. 

## 13: Edit profile

PATCH /user/shelf <br>
Allows users to edit their shelf name. 

## 14: Delete profile
DELETE /user/current <br>
Allows users to delete their profile. 

## 15: Error Redirection Page
GET /error <br>
In case of bad request user redirected here. 
### Error Responses

404 Not Found

```json
{
  "message": "Page not found"
}
```

## 16: Viewing specific user's books.
GET /shelves/:id/:bookId <br>
Only if user privacy status is public. 

## 17: Reset email.
PATCH /user/email <br>
Allows users to reset email.

## 18: Reset Password.
PATCH /user/password <br>
Allows users to reset password.

## 19: Privacy State.
PATCH /user/privacy <br>
Allows users to toggle privacy state. Authorization middleware to be implemented. 

## 20: Search books.
GET /books/search?q=keyword <br>
Allows users to search books by title or author name.
```json
[
  {
    "id": 1,
    "book_name": "Dune",
    "author_name": "Frank Herbert"
  },
  {
    "id": 2,
    "book_name": "Dune Messiah",
    "author_name": "Frank Herbert"
  }
]
```
## 21: Filter books with reviews.
GET /books/filter?hasReview=true <br>
Allows users to filter books based on whether they have review or not. hasReview is a bool value. 