# Quizandlearn backend

[![Build status](../../workflows/CI/badge.svg)](../../actions?query=workflow%3ACI)

**Quizandlearn** is a collaborative quizzes plateform based on NodeJs and React.js.


## Prerequisites

**Quizandlearn** requires `node 16.9.1` with `npm 7.21.1`*

## Installation

1. Clone the repository
2. Add a new `.env` file.

```
MONGODB_URI= "mongodb+srv:// login / credentials "
FRONTEND_URL="http://localhost:3000"
BACKEND_URL="http://localhost:4000"}
```

3. Install dependencies

```
$ npm install
```

4. Run server

```
$ npm start
$ nodemon server
```

### Testing

To run tests

```
$ npm test
```

### Linter

**Quizandlearn** follows the [Airbnb style guide](https://github.com/airbnb/javascript).
To help us we use [ESLint](https://eslint.org/) as a linter:

```
$ npm lint
```
To automatically fix  what can be:
```
npm run lint -- --fix
```

## API Resources
- [POST /signup](#post-signup)
- [POST /login](#post-login)
- [GET /api/quizzes](#get-api-quizzes)
- [POST /api/quizzes](#post-api-quizzes)
- [GET /api/categories](#get-api-categories)

### POST /signup

Example: http://example.gov/api/auth/signup

Request body:

    {
        "name": "Jane",
        "surname": "lala",
        "email": "user@gmail.com",
        "password": "Motdepass123!"
    }

Response body:

    {
        "message": "Utilisateur créé !"
    }

### POST /login

Example: http://example.gov/api/auth/login

Response body:

    {
        "userId": "78928dfd74013bf4d5097789",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpFGRfr.eyJ1c2VySWQiOiI2MjgyOGRmZDc0MDEzYmY0ZDUwOTc0ZDMiLCJpYXQiOjE2NTI3MjMyODYsImV4cCI6MTY1MjgwOTY4Nn0.FnKqrM30L_l7TjWngLV5Xa-ZIKZ0UFjdB2bBpjAo_9k"
    }

### GET /quizzes

Example: http://example.gov/api/quizzes

Response body:

    {
    "quizzes": [
                    {
                        "_id": "62d51c761cd85d9abc2cfrfe",
                        "id_user_owner": "6274f6fe6f466dabdc420ff1",
                        "title": "Titre 3",
                        "description": "Description 3",
                        "categories": [
                            "623dd301933112fee687ee45"
                        ],
                        "questions": [
                            "62d51c761cd85d9abc2ce701",
                            "62d51c761cd85d9abc2ce702"
                        ],
                        "ratings": [],
                        "reportings": [],
                        "createdAt": "2022-07-18T08:40:22.198Z",
                        "updatedAt": "2022-07-18T08:40:22.490Z",
                        "__v": 0
                    }
            ],
            "currentPage": 2,
            "totalPages": 18,
            "numberQuizzes": 35
    }
### POST /quizzes

Example: http://example.gov/api/quizzes

Request body:

    {
        "id_user_owner": "623c6ff8bb5ed6fa91703df7",
        "title": "REACT 2",
        "description": "Description",
        "categories": "623fr301933112fee687ee45"
    }

Response body:

    {
        "message": "Quiz créé",
        "idQuiz": "62e92ffr70f06db885f3hgtf"
    }

### GET /categories

Example: http://example.gov/api/categories

Response body:
    
    {
        "categories": [
            {
                "_id": "623dd2b5933112fee687ee44",
                "title": "Tech"
            },
            {
                "_id": "623dd301933112feefr7ee45",
                "title": "Feminism"
            },
            {
                "_id": "627527dfr52c45e662afd317",
                "title": "Other"
            }
        ]
    }


## Deployment

**Quizandlearn** is deployed automatically on pull request on a heroku server at https://quiz-and-learn-heroku-front.herokuapp.com/


