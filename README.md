# Login SCRUM (MySQL)

> Proyecto sencillo de autenticación con Node.js/Express y frontend vanilla, utilizando MySQL como base de datos.

Este repositorio implementa un sistema de login básico que incluye registro, inicio de sesión y protección de rutas. El servidor utiliza cookies `HttpOnly` para almacenar el token JWT de forma segura.

## 📖 Tabla de Contenidos

* [Acerca del Proyecto](#acerca-del-proyecto)
* [🛠️ Stack Tecnológico](#️-stack-tecnológico)
* [🏁 Empezando](#-empezando)
    * [Pre-requisitos](#pre-requisitos)
    * [Instalación](#instalación)
* [📄 Endpoints de la API](#-endpoints-de-la-api)
* [Notas de Seguridad](#notas-de-seguridad)
* [Migración de SQLite](#migración-de-sqlite)

## Acerca del Proyecto

Este proyecto sirve como un ejemplo fundamental de autenticación web.

* Utiliza **MySQL** (con `mysql2`) para la persistencia de datos.
* El secreto de **JWT** se gestiona de forma segura a través de variables de entorno (`.env`).
* Incluye un middleware de autenticación para proteger rutas (ej. `GET /api/users/me`).
* Al hacer login, el servidor establece una cookie `HttpOnly` (`token`) para mayor seguridad, mientras que el frontend guarda el `username` en `localStorage` para la UI.

## 🛠️ Stack Tecnológico

* **Backend:** Node.js, Express.js
* **Base de Datos:** MySQL (con `mysql2`)
* **Autenticación:** JSON Web Tokens (JWT)
* **Frontend:** HTML, CSS y JavaScript (Vanilla)

## 🏁 Empezando

Sigue estos pasos para levantar el proyecto en tu máquina local.

### Pre-requisitos

* [Node.js](https://nodejs.org/) (v14 o superior)
* [NPM](https://www.npmjs.com/)
* Un servidor [MySQL](https://www.mysql.com/downloads/) o [MariaDB](https://mariadb.org/download/) accesible.

### Instalación

1.  **Clona el repositorio:**
    ```sh
    git clone [https://github.com/TU_USUARIO/TU_REPO.git](https://github.com/TU_USUARIO/TU_REPO.git)
    cd TU_REPO
    ```

2.  **Instala las dependencias:**
    ```sh
    npm install
    ```

3.  **Crea y configura las variables de entorno:**
    * Copia el archivo de ejemplo:
        ```sh
        copy .env.example .env
        ```
    * Edita el archivo `.env` con tu editor de código y completa los valores `DB_*` (host, usuario, contraseña, nombre de la BD) y tu `JWT_SECRET`.

4.  **Inicializa la base de datos:**
    * Elige **una** de las siguientes opciones:

    * **Opción A (Recomendada):** Usar el script de NPM (requiere tener `mysql` CLI en el PATH de tu sistema):
        ```sh
        npm run init-db
        ```
    * **Opción B (Manual):** Ejecutar el script SQL directamente en tu cliente de MySQL:
        ```sql
        -- Desde tu cliente MySQL
        SOURCE scripts/init_db.sql;
        ```

5.  **Levanta el servidor:**
    ```sh
    npm start
    ```

6.  **Abre la aplicación en tu navegador:**
    * [http://localhost:3000/login.html](http://localhost:3000/login.html)

## 📄 Endpoints de la API

* `POST /api/users/register`
    * Body: `{ "username": "...", "password": "..." }`
    * Registra un nuevo usuario.

* `POST /api/users/login`
    * Body: `{ "username": "...", "password": "..." }`
    * Autentica al usuario y devuelve un token JWT en una cookie `HttpOnly`.

* `GET /api/users/me`
    * Ruta protegida. Requiere la cookie de autenticación.
    * Devuelve la información del usuario (`{ username }`).

## Notas de Seguridad

* **No subas tu archivo `.env` al repositorio.** El archivo `.gitignore` ya está configurado para ignorarlo.
* El token se envía al navegador como una **cookie `HttpOnly`**. Esto previene que scripts maliciosos (XSS) en el frontend puedan leer el token.
* **Recomendaciones para producción:** Forzar HTTPS, implementar limitación de intentos de login (rate limiting) y añadir validación más robusta a las entradas del usuario.

## Migración de SQLite

Si esta es una versión actualizada del proyecto y anteriormente usabas SQLite, puedes eliminar el archivo de base de datos legacy para evitar confusiones.

* Desde PowerShell (en la raíz del repo):
    ```powershell
    Remove-Item .\database\users.db
    ```
