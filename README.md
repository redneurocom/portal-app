# CondoReserva

Portal web para la gestión de reservas de áreas comunes en condominios.

Proyecto académico: **Angular 21**, **Express.js** y **MySQL**.

---

## Requisitos previos

- Node.js 18 o superior
- MySQL 8 o superior

---

## 1. Configurar la base de datos

```bash
mysql -u root -p < backend/sql/database.sql
```

---

## 2. Ejecutar el backend Express

```bash
cd backend
npm install
node app.js
```

El backend corre en: **http://localhost:3000**

Edita `backend/.env` con tu contraseña de MySQL si es necesario.

---

## 3. Ejecutar el frontend Angular

Desde la carpeta raíz (terminal separada):

```bash
npm install
npm start
```

El frontend corre en: **http://localhost:4200**

---

## Despliegue temporal con Docker

El proyecto tambien puede levantarse completo con Docker Compose:

```bash
docker compose up -d --build
```

Servicios:

- Frontend Angular servido por Nginx: `http://localhost:8081`
- Backend Express: interno en Docker
- MySQL: interno en Docker

Para detenerlo:

```bash
docker compose down
```

Para destruir tambien la base de datos creada por Docker:

```bash
docker compose down -v
```

---

## Usuarios de prueba

| Rol       | Correo                   | Contrasena |
|-----------|--------------------------|------------|
| Admin     | admin@condoreserva.com   | 123456     |
| Residente | carlos@condoreserva.com  | 123456     |

---

## Funcionalidades

- Login con roles (admin / residente)
- Catalogo de espacios comunes con busqueda
- Reservas con validacion de duplicados
- Cancelacion de reservas
- Avisos (CRUD para admin, vista para residente)
- Reclamos (registro residente, respuesta admin)
- Dashboard con resumen segun rol

---

## Estructura

```
portal-app/
├── src/app/
│   ├── models/          # Interfaces TypeScript
│   ├── services/        # Servicios HTTP
│   ├── pages/           # login, inicio, espacios, reservas, avisos, reclamos
│   └── shared/navbar/   # Navbar compartido
└── backend/
    ├── controllers/     # Logica de negocio
    ├── routes/          # Endpoints REST
    ├── sql/database.sql # Script SQL con datos iniciales
    ├── app.js
    ├── db.js
    └── .env
```

---

> Nota academica: contrasenas en texto simple (sin JWT ni bcrypt). En produccion se usaria encriptacion.
