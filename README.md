week 8 day 2 - Rafael Garcia

TESTEAR
BACK: Modificar modelo Robots para asociarlo a un usuario Cada robot 1 owner Cada user n robots
TESTEAR
// NO - BACK: Modificar el end-point de robots para que también retorne los datos completos de el / los usuarios

TESTEAR
Extras
BACK: Completar los CRUDS de robots y usuarios

usuarios: - Register - Login robots: - get - post (login) - patch / delete (login / owner [who] )

TESTEAR
FRONT:
Users
Login / logout
Register
Robots
Lista (public)
Add (private)
Update (private)
Delete (private)
// NO - FRONT: Modificar la lista de robots para que también muestre el/los usuarios

// NO - FRONT: Añadir un filtro de robots por usuarios

Week 7 - Challenge WeekEnd
Robots
Tendrás que crear un frontend en React (con Redux) que permita al usuario gestionar un listado con sus robots. El usuario debe poder listar, crear, modificar y borrar robots. Cada robot debe mostrar un nombre, una imagen (URL de internet) y unas características:

Velocidad (0-10)
Resistencia (0-10)
Fecha de creación
Tendrás que crear una base de datos MongoDB para almacenar los robots, en Atlas.

Tendrás que crear una API REST con Express, con los siguientes endpoints:

[GET] /robots -> devuelve un array con todos los robots de la BD

[GET] /robots/:idRobot -> devuelve un robot de la BD por id

[POST*] /robots/create -> recibe un robot (sin id), lo crea en la BD y devuelve el robot recién creado

[PATCH*] /robots/update -> recibe un robot, modifica en la BD el robot con la misma id que el recibido, y devuelve el robot modificado

[DELETE*] /robots/delete/:idRobot -> elimina de la BD un robot por id y devuelve un objeto con la id

Recuerda que cada response debe ir con un código de status adecuado y que todos los body de las responses tienen que ser objetos en JSON.

Sora decirlo: TESTEAMOS todo y lo mostramos en SonarCloud.
