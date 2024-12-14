# Backend API Documentation

## */users/register* Endpoint

### Description

The `/users/register` endpoint is used to register a new user in the system. It validates the incoming data, hashes the password, stores the user in the database, and returns a token for authentication.

---

## HTTP Method

**POST**

---

## URL

`/users/register`

---

## Request Body

The request body must include the following fields:

### JSON Format:

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "yourpassword"
}
```

### Field Descriptions:

- **fullname.firstname** (required):

  - Type: String
  - Description: The first name of the user.
  - Constraints: Must be at least 3 characters long.

- **fullname.lastname** (optional):

  - Type: String
  - Description: The last name of the user.
  - Constraints: Must be at least 3 characters long (if provided).

- **email** (required):

  - Type: String
  - Description: The email address of the user.
  - Constraints: Must be a valid email format and at least 5 characters long.

- **password** (required):

  - Type: String
  - Description: The password for the account.
  - Constraints: Must be at least 6 characters long.

---

## Response

### Success Response:

#### HTTP Status Code: 201

#### JSON Format:

```json
{
    "token": "<JWT_TOKEN>",
    "user": {
        "_id": "<USER_ID>",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "johndoe@example.com"
    }
}
```

### Field Descriptions:

- **token**: The JSON Web Token (JWT) to be used for authentication.
- **user**:
  - **\_id**: The unique identifier of the user.
  - **fullname**: The registered user's name.
  - **email**: The registered user's email.

---

### Error Responses:

#### Validation Error:

##### HTTP Status Code: 400

```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password must be six characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

#### Missing Fields:

##### HTTP Status Code: 400

````json
{
    "errors": [
        {
            "msg": "All fields are required",
            "param": "email",
            "location": "body"
        }
    ]
}

---

## Notes
- Ensure that the `password` field is hashed before storage.
- The endpoint returns a JWT token, which should be used for authentication in subsequent requests.

---

## Example Usage
### cURL Request:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "yourpassword"
  }' \
  http://localhost:3000/users/register
````

### Example Response:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNkM2VhMWYyNTgxODExNDJlNTVlMTAiLCJpYXQiOjE2MzQ5NTkyMjN9.dRTE_kbqSbKw6iQ4Fb3nCIdNQFrrHbqAd8s2CdWuABY",
    "user": {
        "_id": "623d3ea1f258181142e55e10",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "johndoe@example.com"
    }
}
```
