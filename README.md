# NINJA TALEND CHALLENGE

Challenge to create a users API REST

## _Technologies_

- NodeJs
- Express
- Angular
- TypeScript
- MySQL
- Docker
- Docker Compose

## _directories order and files_

- frontend: Solution based on Angular to create interfaces.
- backend: Solution based on Express to create the API REST.
- .env: File to save the settings to work with docker containers.
- Dockerfile.backend: File to create the image with the necessary settings to run backend application.
- Dockerfile.frontend: File to create the image with the necessary settings to run fronted application.

## _Installation_

Edit the `./.env` file with this configurations:

- DB_PATH: Folder path where it will create the volume for database. It is recommended Se recomienda que sea fuera de la carpeta del proyecto.
- DB_HOST: IP or service's name where it is the database.
- DB_NAME: Database's name.
- DB_USER: User allowed for connect to database.
- DB_PASS: User's password for connect to database.
- DB_PORT: Port to expose the database.

In the backend directory you must setting the MySQL database connection parameters in the file `./backend/.env`:

- DB_HOST: IP or service's name where it is the database..
- DB_NAME: Database's name.
- DB_USER: User allowed for connect to database.
- DB_PASS: User's password for connect to database.

When you have configured both files, execute the following code `docker-compose up -d`

In the file `./backend/backup` you find the script to restore database. I recommend to use the service called adminer to restore database of easy way.

Enter to `http://localhost:5003/` to use service adminer, if your local enviroment is up, you must put user and password credentials to access to database. When you are connected, enter in `Export` and attach the backup file.

At the end of the process you can connect to application visual from the next link:
`http://localhost:5001`

## _ENDPOINTS_

### GET USERS

#### Request
`GET /users`

#### Response
```
[
   {
        "id":3,
        "firstname":"Israel",
        "lastname":"Flores",
        "email":"isx@gmail.com",
        "birthDate":"1994-01-03",
        "address":{
            "id":3,
            "street":"Jr Manuel Arevalo Orbe",
            "city":"tarapoto",
            "country":"UK",
            "postalCode":"042"
        }
   }
]
```

### CREATE USER

#### Request
`POST /users/`

#### Params
```
{
   "id":4,
   "firstname":"GA",
   "lastname":"GA",
   "email":"ga@ga.com",
   "birthDate":"2022-05-06T00:00:00.000Z",
   "address":{
      "id":4,
      "street":"Ga",
      "city":"GA",
      "country":"UK",
      "postalcode":"1212",
      "userId":4
   }
}
```

### EDIT USER

#### Request
`GET /users/:id`

#### Response
```
{
   "id":3,
   "firstname":"Israel",
   "lastname":"Flores",
   "email":"isx@gmail.com",
   "birthDate":"1994-01-03",
   "address":{
      "id":3,
      "street":"Jr Manuel Arevalo Orbe",
      "city":"tarapoto",
      "country":"UK",
      "postalcode":"042"
   }
}
```

### DELETE USER

#### Request
`DELETE /users/:id`

#### Response
```
OK
```

