# Backend API Documentation

## Endpoint: /users/register 

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


## Endpoint: /users/login

### Description
The `/users/login` endpoint is used to authenticate an existing user. It validates the email and password, checks the credentials against the database, and returns a token for authentication.

---

### HTTP Method
**POST**

### URL
`/users/login`

---

### Request Body
The request body must include the following fields:

#### JSON Format:
```json
{
    "email": "johndoe@example.com",
    "password": "yourpassword"
}
```

#### Field Descriptions:
- **email** (required):
  - Type: String
  - Description: The email address of the user.
  - Constraints: Must be a valid email format.

- **password** (required):
  - Type: String
  - Description: The password for the account.
  - Constraints: Must be at least 6 characters long.

---

### Response
#### Success Response:
##### HTTP Status Code: 200

##### JSON Format:
```json
{
    "token": "<JWT_TOKEN>",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "_id": "<USER_ID>",
        "email": "johndoe@example.com",
        "password": "<USER_PASSWORD>"
    }
}
```

#### Field Descriptions:
- **token**: The JSON Web Token (JWT) to be used for authentication.
- **user**:
  - **_id**: The unique identifier of the user.
  - **fullname**: The authenticated user's name.
  - **email**: The authenticated user's email.

---

#### Error Responses:

##### Validation Error:
###### HTTP Status Code: 400
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password must be at least 6 characters long",
            "param": "password",
            "location": "body"
        }
    ]
}
```

##### Invalid Credentials:
###### HTTP Status Code: 401
```json
{
    "message": "Invalid email or password"
}
```

## Endpoint: /users/profile

### Description
The `/users/profile` endpoint is used to retrieve the authenticated user's profile. This endpoint requires the user to be authenticated and will return the user's details.

---

### HTTP Method
**GET**

### URL
`/users/profile`

---

### Headers
- **Authorization** (required):
  - Format: `Bearer <JWT_TOKEN>`
  - Description: The token obtained during login.

---

### Response
#### Success Response:
##### HTTP Status Code: 200

##### JSON Format:
```json
{
    "_id": "<USER_ID>",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "johndoe@example.com"
}
```

#### Field Descriptions:
- **_id**: The unique identifier of the user.
- **fullname**:
  - **firstname**: The user's first name.
  - **lastname**: The user's last name.
- **email**: The user's email address.

---

#### Error Responses:

##### Unauthorized Access:
###### HTTP Status Code: 401
```json
{
    "message": "Unauthorized"
}
```

---

## Endpoint: /users/logout

### Description
The `/users/logout` endpoint is used to log out the authenticated user. It clears the authentication token and blacklists it to prevent reuse.

---

### HTTP Method
**GET**

### URL
`/users/logout`

---

### Headers
- **Authorization** (required):
  - Format: `Bearer <JWT_TOKEN>`
  - Description: The token obtained during login.

---

### Response
#### Success Response:
##### HTTP Status Code: 200

##### JSON Format:
```json
{
    "message": "Logged out"
}
```

---

#### Error Responses:

##### Unauthorized Access:
###### HTTP Status Code: 401
```json
{
    "message": "Unauthorized"
}
```

## Endpoint: /captains/register

### Description
The `/captains/register` endpoint is used to register a new captain in the system. It validates the incoming data, hashes the password, stores the captain in the database, and returns a token for authentication.

---

### HTTP Method
**POST**

### URL
`/captains/register`

---

### Request Body
The request body must include the following fields:

#### JSON Format:
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "password": "yourpassword",
    "vehicle": {
        "color": "Red",
        "plate": "AB123CD",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

#### Field Descriptions:
- **fullname.firstname** (required):
  - Type: String
  - Description: The first name of the captain.
  - Constraints: Must be at least 3 characters long.

- **fullname.lastname** (optional):
  - Type: String
  - Description: The last name of the captain.
  - Constraints: Must be at least 3 characters long (if provided).

- **email** (required):
  - Type: String
  - Description: The email address of the captain.
  - Constraints: Must be a valid email format.

- **password** (required):
  - Type: String
  - Description: The password for the account.
  - Constraints: Must be at least 6 characters long.

- **vehicle.color** (required):
  - Type: String
  - Description: The color of the captain's vehicle.
  - Constraints: Must be at least 3 characters long.

- **vehicle.plate** (required):
  - Type: String
  - Description: The license plate of the captain's vehicle.
  - Constraints: Must be at least 3 characters long.

- **vehicle.capacity** (required):
  - Type: Number
  - Description: The capacity of the captain's vehicle.
  - Constraints: Must be at least 1.

- **vehicle.vehicleType** (required):
  - Type: String
  - Description: The type of the vehicle.
  - Constraints: Must be one of `car`, `motorcycle`, or `auto`.

---

### Response
#### Success Response:
##### HTTP Status Code: 201

##### JSON Format:
```json
{
    "token": "<JWT_TOKEN>",
    "captain": {
        "_id": "<CAPTAIN_ID>",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "johndoe@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "AB123CD",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

#### Field Descriptions:
- **token**: The JSON Web Token (JWT) to be used for authentication.
- **captain**:
  - **_id**: The unique identifier of the captain.
  - **fullname**: The registered captain's name.
  - **email**: The registered captain's email.
  - **vehicle**:
    - **color**: The color of the captain's vehicle.
    - **plate**: The license plate of the captain's vehicle.
    - **capacity**: The capacity of the vehicle.
    - **vehicleType**: The type of the vehicle.

---

#### Error Responses:

##### Validation Error:
###### HTTP Status Code: 400
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Color must be at least 3 characters long",
            "param": "vehicle.color",
            "location": "body"
        }
    ]
}
```

##### Captain Already Exists:
###### HTTP Status Code: 400
```json
{
    "message": "Captain already exist"
}
```


