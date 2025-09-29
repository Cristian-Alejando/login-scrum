# Login SCRUM – Proyecto SEM

Login sencillo **100 % local** (sin Firebase ni nube) construido con:

- **Frontend**: HTML + CSS + JS vanilla  
- **Backend**: Node.js + Express  
- **Base de datos**: SQLite (archivo `.db` local)  
- **Metodología**: organización tipo SCRUM (carpetas por capas)

---

## 📂 Estructura

login-scrum/
├─ backend/        # API con Express
├─ frontend/       # Vistas vanilla (login & registro)
├─ database/       # SQLite local (users.db)
└─ README.md       # Este archivo


---

## 🚀 Cómo ejecutar (local)
1. **Instalar dependencias**  
   npm install

## Levantar servidor
node backend/server.js

## Abrir en navegador
http://localhost:3000/login.html

## 🔐 Seguridad
-Contraseñas encriptadas con bcrypt.
-Sin conexión externa → datos nunca salen de la PC.

## 📄 Demostración BD
-Archivo físico: database/users.db
-Puede verse con SQLite Viewer (extensión de VS Code).