# API EVENTOS DEPORTIVOS

# Registrar usuarios

URL: /api/users/register
MÉTODO: POST
BODY: username, email, password y rol

Respuesta:
Responde con los datos del nuevo usuario

```js
[
    {
        "username": "juantonio",
        "email": "prueba@gmail.com",
        "password": "123456",
        "rol": "user"
    }
]

```

# Hacer un login de usuario

URL: /api/users/login
MÉTODO: POST
BODY: email y contraseña

Respuesta:
Responde con los datos del usuario logado, además del su token de sesión

```js
[
    {
        "message": "Login exitoso",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc1ZDcxOWIxODNlNWFkNDcxODNmMDZkIiwiZW1haWwiOiJwcnVlYmEyQGdtYWlsLmNvbSIsInJvbCI6ImFkbWluIiwiaWF0IjoxNzM0MTc5ODI2fQ.zh1CqOHVLwzBnFnji4Qte8GTvuO2fmpxcmx7yt3Q_aA"
    }
]

```

# Información del usuario logueado

URL: /api/users/profile
MÉTODO: GET
BODY: X
HEADERS: Autohorization - Token

Respuesta:
Devuelve la información del usuario logueado. Es necesario el token de sesión

```js

[
    {
        "_id": "675d719b183e5ad47183f06d",
        "username": "juan prueba",
        "email": "prueba2@gmail.com",
        "rol": "admin",
        "createdAt": "2024-12-14T11:52:59.949Z",
        "updatedAt": "2024-12-14T11:52:59.949Z"
    }
]

```

