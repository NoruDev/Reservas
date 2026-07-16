# Sistema de Reservas de Citas

Un sistema completo de gestión de reservas de citas con autenticación JWT, panel de administración y interfaz de cliente.

## 🏗️ Stack Tecnológico

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Node.js + Express
- **Base de Datos**: PostgreSQL + Sequelize ORM
- **Autenticación**: JWT (JSON Web Tokens)
- **Contraseñas**: bcryptjs

## 📋 Requisitos Previos

- Node.js 16+
- PostgreSQL 12+
- npm o yarn

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <URL-del-repositorio>
cd Sistema-reservas
```

### 2. Instalar dependencias

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
# No requiere instalación (es vanilla)
```

### 3. Configurar variables de entorno

```bash
cd server
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales de PostgreSQL:

```env
# Base de Datos
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=sistema_reservas_db
DB_HOST=127.0.0.1
DB_PORT=5432

# Servidor
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_min_32_caracteres

# URLs
FRONTEND_URL=http://localhost:5500
API_URL=http://localhost:3000
```

### 4. Crear la base de datos en PostgreSQL

```bash
psql -U postgres
CREATE DATABASE sistema_reservas_db;
\q
```

### 5. Ejecutar migraciones

```bash
cd server
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 🎯 Ejecución Local

### Terminal 1: Backend

```bash
cd server
npm start
# O con nodemon para desarrollo:
npx nodemon index.js
```

El servidor estará en: `http://localhost:3000`

### Terminal 2: Frontend

Opción A - Usando Live Server en VS Code:
- Click derecho en `client/index.html` → "Open with Live Server" (puerto 5500)

Opción B - Servidor HTTP simple:
```bash
cd client
python -m http.server 8000
# O con Node:
npx http-server
```

Accede a: `http://localhost:5500` (o el puerto usado)

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión (retorna JWT)

### Servicios
- `GET /api/servicios` - Listar todos
- `POST /api/servicios` - Crear (requiere admin)
- `PUT /api/servicios/:id` - Editar (requiere admin)
- `DELETE /api/servicios/:id` - Eliminar (requiere admin)

### Disponibilidad (Horarios)
- `POST /api/disponibilidad` - Configurar horarios (requiere admin)
- `GET /api/disponibilidad?diaSemana=1` - Obtener horarios por día

### Reservas
- `POST /api/reservas` - Crear reserva (requiere autenticación)
- `GET /api/reservas/mis-reservas` - Mis reservas (requiere autenticación)
- `GET /api/reservas?fecha=2026-07-15` - Listar por fecha (requiere admin)
- `PUT /api/reservas/:id/cancelar` - Cancelar reserva (requiere autenticación)

## 👤 Usuarios de Prueba

Después de ejecutar los seeders:

**Admin:**
- Email: `admin@example.com`
- Password: `admin123`

**Cliente:**
- Email: `cliente@example.com`
- Password: `cliente123`

## 🗂️ Estructura del Proyecto

```
Sistema-reservas/
├── client/
│   └── index.html          # Interfaz única SPA
├── server/
│   ├── index.js            # Punto de entrada
│   ├── package.json
│   ├── config/
│   │   └── config.json     # Configuración de BD
│   ├── controllers/        # Lógica de negocio
│   ├── middleware/         # Autenticación JWT
│   ├── models/             # Modelos Sequelize
│   ├── migrations/         # Versionamiento de BD
│   ├── routes/             # Rutas API
│   └── seeders/            # Datos iniciales
└── README.md
```

## 🔐 Notas de Seguridad

⚠️ **En Producción:**
- Cambiar `JWT_SECRET` por una clave fuerte
- Usar variables de entorno reales (nunca en el código)
- Configurar HTTPS
- Validar inputs más estrictamente
- Configurar CORS correctamente
- No exponer errores detallados al cliente


