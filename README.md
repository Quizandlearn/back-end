# Quizandlearn backend

[![Build status](../../workflows/CI/badge.svg)](../../actions?query=workflow%3ACI)

**Quizandlearn** is a collaborative quizzes plateform based on NodeJs and React.js.


## Prerequisites

**Quizandlearn** requires:

- Node

```
$ nvm install 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
```

## Installation

1. Clone the repository
2. Go to the staging branch. Add a new `config` folder. Create a `default.json` file inside with MongoDB login credentials (cf Notion).

` { "mongoURI": "mongodb+srv:// login / credentials " }`

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

We use [ESLint](https://eslint.org/) as a linter

```
$ npm lint
```

## API Resources
- [POST /signup](#post-signup)
- [POST /login](#post-login)
- [GET /api/quizzes](#get-api-quizzes)
- [POST /api/quizzes](#post-api-quizzes)
- [GET /api/categories](#get-api-categories)

### POST /signup

Example: http://example.gov/api/auth/signup

Response body:

    {
        "message": "Utilisateur créé !"
    }

### POST /login

Example: http://example.gov/api/auth/login

Response body:

    {
        "userId": "78928dfd74013bf4d5097789",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpFGRV8.eyJ1c2VySWQiOiI2MjgyOGRmZDc0MDEzYmY0ZDUwOTc0ZDMiLCJpYXQiOjE2NTI3MjMyODYsImV4cCI6MTY1MjgwOTY4Nn0.FnKqrM30L_l7TjWngLV5Xa-ZIKZ0UFjdB2bBpjAo_9k"
    }

### GET /quizzes

Example: http://example.gov/api/quizzes

Response body:

    [
        {
            "_id": "623499c882e3ab6992c5c193",
            "id_user_owner": "62321737b7c156b4a8375713",
            "title": "Quiz test",
            "description": "Description Text",
            "questions": [],
            "status": 1,
            "ratings": [],
            "reportings": [],
            "createdAt": "2022-03-18T14:40:08.333Z",
            "updatedAt": "2022-03-18T14:40:08.333Z",
            "__v": 0
        }
    ]

### POST /quizzes

Example: http://example.gov/api/quizzes

Response body:

    {
        "message": "Quiz créé"
    }

### GET /categories

Example: http://example.gov/api/categories

Response body:
    
    {
        "categories": [
            "Tech",
            "Feminism",
            "Other"
        ]
    }



## License

See the [LICENCE](LICENSE) file for details.
