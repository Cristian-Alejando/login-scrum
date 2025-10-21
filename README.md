# Login SCRUM (actualizado)

Proyecto sencillo de autenticación con Node.js/Express y frontend vanilla.

Principales cambios y notas:

Requisitos

Instalación y ejecución (MySQL)

1. Instalar dependencias:

```powershell
npm install
```

2. Copiar `.env.example` a `.env` y completar valores:

```powershell
copy .env.example .env
# Edita .env con tu editor y coloca la contraseña de DB y JWT_SECRET
```

3. Crear la base de datos y la tabla (usar MySQL client):

```sql
SOURCE scripts/init_db.sql;
```

4. Levantar servidor:

```powershell
node backend/server.js
```

5. Abrir en el navegador:

http://localhost:3000/login.html

Endpoints principales

Notas de seguridad y mejoras recomendadas

Si quieres que aplique más cambios (migrar a SQLite, proteger `dashboard.html` desde el servidor, o añadir tests), dime y lo hago.

# Login SCRUM (MySQL)

Proyecto sencillo de autenticación con Node.js/Express y frontend vanilla. Este repo ahora está unificado para usar MySQL (no SQLite).

Principales cambios y notas:
- Uso de MySQL a través de `mysql2` en `backend/database.js`.
- El secreto JWT se lee desde `process.env.JWT_SECRET` (ver `.env.example`).
- Se añadió middleware de autenticación y una ruta protegida: `GET /api/users/me`.
- Al hacer login, el servidor establece una cookie HttpOnly `token` para mayor seguridad. El frontend también guarda `username` en `localStorage`.

Requisitos
- Node.js 14+ y NPM
- MySQL / MariaDB accesible desde la máquina de desarrollo

Instalación y ejecución (MySQL)

1. Instalar dependencias:

```powershell
npm install
```

2. Copiar `.env.example` a `.env` y completar valores (DB_* y JWT_SECRET):

```powershell
copy .env.example .env
# Edita .env con tu editor y coloca la contraseña de DB y JWT_SECRET
```

3. Inicializar la base de datos (opciones):

- Usar cliente MySQL manualmente:

```sql
-- desde MySQL
SOURCE scripts/init_db.sql;
```

- O usar el helper (requiere `mysql` CLI instalado):

```powershell
npm run init-db
```

4. Levantar servidor:

```powershell
npm start
```

5. Abrir en el navegador:

http://localhost:3000/login.html

Endpoints principales
- POST /api/users/register  -> { username, password }
- POST /api/users/login     -> { username, password }  -> devuelve token JWT y cookie HttpOnly
- GET  /api/users/me        -> protegido, devuelve info del usuario

Eliminar archivo SQLite (local)
- Si tu migración a MySQL ya está hecha, elimina el archivo legacy `database/users.db` localmente para evitar confusión. En PowerShell ejecuta (desde la carpeta del repo):

```powershell
Remove-Item .\database\users.db
```

Notas de seguridad y pasos siguientes
- No subas `.env` al repositorio. `.gitignore` ya ignora `.env`.
- El token se envía al navegador como cookie HttpOnly; eso evita que JS malicioso lo lea. El servidor protege `dashboard.html` comprobando la cookie o un header Authorization.
- Recomendaciones: forzar HTTPS en producción, limitar intentos de login y agregar validación adicional.
