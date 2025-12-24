# 🗺️ Roadmap Detallado - Aplicación de Notas Full Stack

## 📋 Resumen del Reto

| Aspecto | Detalle |
|---------|---------|
| **Tipo** | Aplicación web SPA (Single Page Application) |
| **Estructura** | Frontend + Backend en carpetas separadas |
| **Base de datos** | Relacional con ORM (NO in-memory) |
| **Arquitectura Backend** | Por capas (Controllers, Services, DAOs/Repositories) |

---

## 🔴 FASE 1 - OBLIGATORIA (Para aprobar)

### 1️⃣ Setup Inicial del Proyecto
- [ ] Crear estructura de carpetas `/frontend` y `/backend`
- [ ] Inicializar repositorio Git
- [ ] Configurar `.gitignore` para ambos proyectos

### 2️⃣ Backend - Configuración Base
- [ ] Elegir stack (recomendado: **NestJS** o **Spring Boot**)
- [ ] Configurar ORM (TypeORM, Prisma, Hibernate, etc.)
- [ ] Configurar base de datos relacional (PostgreSQL/MySQL/SQLite)
- [ ] Crear entidad `Note` con campos:
  - `id` (PK)
  - `title` (string)
  - `content` (text)
  - `isArchived` (boolean, default: false)
  - `createdAt` (timestamp)
  - `updatedAt` (timestamp)

### 3️⃣ Backend - Arquitectura por Capas

```
backend/
├── controllers/    # Manejo de requests HTTP
├── services/       # Lógica de negocio
├── repositories/   # Acceso a datos (DAOs)
├── entities/       # Modelos de la BD
└── dtos/           # Data Transfer Objects
```

### 4️⃣ Backend - API REST Endpoints (Fase 1)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/notes` | Listar notas activas |
| `GET` | `/api/notes/archived` | Listar notas archivadas |
| `GET` | `/api/notes/:id` | Obtener nota por ID |
| `POST` | `/api/notes` | Crear nueva nota |
| `PUT` | `/api/notes/:id` | Editar nota |
| `DELETE` | `/api/notes/:id` | Eliminar nota |
| `PATCH` | `/api/notes/:id/archive` | Archivar nota |
| `PATCH` | `/api/notes/:id/unarchive` | Desarchivar nota |

### 5️⃣ Frontend - Configuración Base
- [ ] Elegir framework (React, Vue, Angular)
- [ ] Crear proyecto con `create-react-app`, `vite`, o similar
- [ ] Configurar cliente HTTP (Axios o Fetch)
- [ ] Estructurar carpetas:

```
frontend/
├── components/     # Componentes reutilizables
├── pages/          # Vistas principales
├── services/       # Llamadas a la API
├── hooks/          # Custom hooks
└── styles/         # CSS/SCSS
```

### 6️⃣ Frontend - Componentes UI (Fase 1)
- [ ] **NoteList** - Lista de notas (activas/archivadas)
- [ ] **NoteCard** - Tarjeta individual de nota
- [ ] **NoteForm** - Formulario crear/editar nota
- [ ] **Header/Navbar** - Navegación entre activas/archivadas
- [ ] Botones de acción: Editar, Eliminar, Archivar/Desarchivar

### 7️⃣ Funcionalidades Fase 1
- [ ] ✅ Crear notas (título + contenido)
- [ ] ✅ Editar notas existentes
- [ ] ✅ Eliminar notas
- [ ] ✅ Archivar/Desarchivar notas
- [ ] ✅ Ver lista de notas activas
- [ ] ✅ Ver lista de notas archivadas

---

## 🟡 FASE 2 - PUNTOS EXTRA

### 8️⃣ Backend - Extensiones para Categorías
- [ ] Crear entidad `Category`:
  - `id` (PK)
  - `name` (string, unique)
- [ ] Crear relación Many-to-Many: `Note ↔ Category`
- [ ] Nuevos endpoints:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/categories` | Listar categorías |
| `POST` | `/api/categories` | Crear categoría |
| `POST` | `/api/notes/:id/categories` | Añadir categoría a nota |
| `DELETE` | `/api/notes/:id/categories/:catId` | Quitar categoría |
| `GET` | `/api/notes?category=:catId` | Filtrar por categoría |

### 9️⃣ Frontend - UI para Categorías
- [ ] **CategoryBadge** - Etiqueta visual para categorías
- [ ] **CategorySelector** - Selector multi-categoría en notas
- [ ] **CategoryFilter** - Filtro dropdown/checkboxes
- [ ] **CategoryManager** - CRUD de categorías

---

## 🟢 ENTREGABLES REQUERIDOS

### 🔟 Script de Ejecución
- [ ] Crear `run.sh` (bash/zsh) que:
  - Instale dependencias del backend
  - Instale dependencias del frontend
  - Configure/cree la base de datos
  - Ejecute migraciones del ORM
  - Levante ambos servidores

```bash
#!/bin/bash
# Ejemplo de estructura
cd backend && npm install && npm run migrate && npm run start &
cd frontend && npm install && npm run dev
```

### 1️⃣1️⃣ README.md Completo
- [ ] Descripción del proyecto
- [ ] Requisitos del sistema:
  - Node.js vX.X.X
  - npm vX.X.X
  - Base de datos (PostgreSQL/MySQL/SQLite) vX.X
- [ ] Instrucciones de instalación
- [ ] Cómo ejecutar la aplicación
- [ ] (Opcional) Credenciales de usuario default
- [ ] (Opcional) URL de versión desplegada

---

## ⏱️ Timeline Sugerido

| Día | Tareas |
|-----|--------|
| **Día 1** | Setup proyecto, BD, entidades base |
| **Día 2** | Backend completo Fase 1 (API REST) |
| **Día 3** | Frontend base + componentes |
| **Día 4** | Integración Frontend-Backend Fase 1 |
| **Día 5** | Testing, bugs, pulir UX |
| **Día 6** | Fase 2 (categorías) |
| **Día 7** | Script `run.sh`, README, deploy opcional |

---

## 💡 Stack Recomendado

| Componente | Tecnología Sugerida |
|------------|---------------------|
| **Backend** | NestJS (TypeScript) o Spring Boot (Java) |
| **ORM** | TypeORM / Prisma / Hibernate |
| **Base de Datos** | PostgreSQL o SQLite (para simplicidad) |
| **Frontend** | React + Vite |
| **HTTP Client** | Axios |
| **Estilos** | CSS Modules o TailwindCSS |

---

## 📌 Notas Importantes

> ⚠️ **Laravel y Django** no soportan separación por capas por defecto. Si usas estos frameworks, necesitas ajustar la arquitectura manualmente.

> ✅ **NestJS y Spring Boot** facilitan/imponen esta separación de capas.

> 🚫 **NO** se permite almacenamiento en memoria ni mocks - debe persistir en BD relacional.

---

## ✅ Checklist Final antes de Entregar

- [ ] Código subido a repositorio GitHub privado
- [ ] Carpetas separadas: `/backend` y `/frontend`
- [ ] Script `run.sh` funcional
- [ ] `README.md` con versiones específicas de herramientas
- [ ] Base de datos relacional con ORM
- [ ] Arquitectura por capas en backend
- [ ] Todas las funcionalidades de Fase 1 implementadas
- [ ] (Opcional) Funcionalidades de Fase 2
- [ ] (Opcional) Login con credenciales documentadas
- [ ] (Opcional) URL de deploy en producción
