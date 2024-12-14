# API EVENTOS DEPORTIVOS

# Listar todos los eventos

URL: /api/events/
MÉTODO: GET
BODY: X

Respuesta:
Lista todos lo eventos de la base de datos

```js
{
    "success": true,
    "list": [
        {
            "name": "Partido de fútbol",
            "description": "Partido de fútbol para niños de 5 años",
            "date": "2024-12-20T20:00:00Z",
            "location": "Estadio Nacional",
            "typeSport": "Fútbol",
            "planner": "675578e7abbddcd2088901d1"
        },
        //... +
    ]
}
```

# Listar un evento por su id

URL: /api/events/:eventId
MÉTODO: GET
BODY: X

Respuesta:
Lista el evento que se busca por ID. Se debe incluir el id en la URL

```js
{
    "_id": "6755c11288bd0aed7d186dc3",
    "name": "Petanca - Torneo de Verano",
    "description": "Torneo de petanca entre equipos locales",
    "date": "2024-07-10T18:00:00.000Z",
    "location": "París",
    "typeSport": "Petanca",
    "planner": {
        "_id": "6755b72fc64c80ce1cb175eb",
        "username": "juantonio2"
    },
    "createdAt": "2024-12-08T15:53:54.461Z",
    "updatedAt": "2024-12-08T15:53:54.461Z"
}
```

# Crear un nuevo evento

URL: /api/events
MÉTODO: POST
BODY: name, description, date, location, typeSport y planner
HEADERS: Autohorization - Token

```js
{
    "name": "Partido de tenis", 
    "description": "Partido de tenis femenino en Coslada",
    "date": "2024-07-10T18:00:00.000Z",
    "location": "Coslada",
    "typeSport": "Tenis",
    "planner": "6755b72fc64c80ce1cb175eb",
}
```

Respuesta:
Devuelve la información del evento creado

```js
{
    "_id": "6755c11288bd0aed7d186dc3",
    "name": "Petanca - Torneo de Verano",
    "description": "Torneo de petanca entre equipos locales",
    "date": "2024-07-10T18:00:00.000Z",
    "location": "París",
    "typeSport": "Petanca",
    "planner": {
        "_id": "6755b72fc64c80ce1cb175eb",
        "username": "juantonio2"
    },
    "createdAt": "2024-12-08T15:53:54.461Z",
    "updatedAt": "2024-12-08T15:53:54.461Z",
    "__v": 0
}
```


# Modificar un evento existente

URL: /api/events/eventId
MÉTODO: PUT
BODY: name, description, date, location, typeSport o planner. El campo que se quiera modificar
HEADERS: Autohorization - Token

```js
{
    "description": "Partido de tenis femenino en Pinto",
    "location": "Pinto"
}
```

Respuesta:
Devuelve el mensaje de éxito o fracaso

```js
{
    "message": "Evento actualizado correctamente"
}
```

# Eliminar un evento existente

URL: /api/events/eventId
MÉTODO: DELETE
BODY: X
HEADERS: Autohorization - Token


Respuesta:
Si no eres el usuario que creó el evento: 

```js
{
  "message": "No tienes permiso para eliminar este evento"
}
```

Si tienes permiso borrar el evento:
```js
{
  "message": "Evento eliminado correctamente"
}
```