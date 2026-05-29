# API Documentation

## Overview
| id | API  | Description |
|--|-------|----------|
| 1 | POST /auth/register | To register new users |
| 2 | POST /auth/login | To login new users |
| 3 | POST /auth/logout | Allow users to log out of existing session |
| 4 | GET /auth/current | Allow system to retrieve current user's info |
| 5 | POST /books | Allows users to add a new book |
| 6 | GET /books | Allows users to view all the books |
| 7 | GET /books/:id  | Allows users to view a specific book |
| 8 | PATCH /books/:id | Allows user to update one or more fields of an existing book |
| 9 | DELETE /books/:id | Allows users to remove a new book |
| 10 | GET /shelves | Allows users to view other users' shelves collectievly |
| 11 | GET /shelves/:id | Allow users to view specific users' shelves |

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

GET /auth/current <br>
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