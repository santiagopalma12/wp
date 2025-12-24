<div align="center">

# 📝 Notes App

### Full Stack Note-Taking Application

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

<p align="center">
  <strong>A modern, full-stack Single Page Application for creating, organizing, and managing notes with categories.</strong>
</p>

---

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Reference](#-api-reference) • [Architecture](#-architecture)

</div>

---

## ✨ Features

### Phase 1 - Core Functionality
- ✅ **CRUD Operations** - Create, Read, Update, and Delete notes
- ✅ **Archive System** - Archive and unarchive notes for better organization
- ✅ **Dual Views** - Switch between active and archived notes
- ✅ **Persistent Storage** - SQLite database with TypeORM ORM

### Phase 2 - Categories (Extra Points)
- ✅ **Category Management** - Create and delete categories with custom colors
- ✅ **Tagging System** - Add/remove multiple categories to notes
- ✅ **Filtering** - Filter notes by category
- ✅ **Color Customization** - 12 preset colors for categories

---

## 🛠 Tech Stack

<table>
<tr>
<td align="center"><strong>Backend</strong></td>
<td align="center"><strong>Frontend</strong></td>
<td align="center"><strong>Database</strong></td>
</tr>
<tr>
<td>

- NestJS 10.x
- TypeORM 0.3.x
- class-validator
- class-transformer

</td>
<td>

- React 18
- Vite 5.x
- Axios 1.6.x
- Vanilla CSS

</td>
<td>

- SQLite 3.x
- Relational model
- Many-to-Many relations

</td>
</tr>
</table>

---

## 📋 Requirements

| Requirement | Version |
|-------------|---------|
| **Node.js** | >= 18.17.0 |
| **npm** | >= 9.0.0 |

---

## 🚀 Quick Start

### Option 1: Using the run script (Linux/macOS)

```bash
chmod +x run.sh
./run.sh
```

### Option 2: Manual Setup

**1. Backend Setup**
```bash
cd backend
npm install
npm run start:dev
```

**2. Frontend Setup** (new terminal)
```bash
cd frontend
npm install
npm run dev
```

### 🌐 Access the Application

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:3000 |

---

## 📡 API Reference

### Notes Endpoints

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/api/notes` | Get active notes (optional: `?category=id`) |
| `GET` | `/api/notes/archived` | Get archived notes |
| `GET` | `/api/notes/:id` | Get note by ID |
| `POST` | `/api/notes` | Create new note |
| `PUT` | `/api/notes/:id` | Update note |
| `DELETE` | `/api/notes/:id` | Delete note |
| `PATCH` | `/api/notes/:id/archive` | Archive note |
| `PATCH` | `/api/notes/:id/unarchive` | Unarchive note |
| `POST` | `/api/notes/:id/categories/:catId` | Add category to note |
| `DELETE` | `/api/notes/:id/categories/:catId` | Remove category |

### Categories Endpoints

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/api/categories` | Get all categories |
| `POST` | `/api/categories` | Create category |
| `DELETE` | `/api/categories/:id` | Delete category |

---

## 📁 Project Structure

```
📦 notes-app
├── 📂 backend/                 # NestJS Backend
│   ├── 📂 src/
│   │   ├── 📂 notes/           # Notes module
│   │   │   ├── 📂 dto/         # Data Transfer Objects
│   │   │   ├── 📂 entities/    # TypeORM entities
│   │   │   ├── notes.controller.ts
│   │   │   ├── notes.service.ts
│   │   │   └── notes.module.ts
│   │   ├── 📂 categories/      # Categories module
│   │   │   ├── 📂 dto/
│   │   │   ├── 📂 entities/
│   │   │   ├── categories.controller.ts
│   │   │   ├── categories.service.ts
│   │   │   └── categories.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
├── 📂 frontend/                # React + Vite Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/      # React components
│   │   ├── 📂 services/        # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── run.sh                      # Startup script
└── README.md
```

---

## 🏗 Architecture

The backend follows a **layered architecture** pattern:

```
┌─────────────────────────────────────────────┐
│               Controllers                    │  ← HTTP Request Handling
├─────────────────────────────────────────────┤
│                Services                      │  ← Business Logic
├─────────────────────────────────────────────┤
│              Repositories                    │  ← Data Access (TypeORM)
├─────────────────────────────────────────────┤
│                Entities                      │  ← Database Models
└─────────────────────────────────────────────┘
                    │
                    ▼
            ┌───────────────┐
            │    SQLite     │
            │   Database    │
            └───────────────┘
```

### Key Architectural Decisions

- **Separation of Concerns**: Each layer has a single responsibility
- **Dependency Injection**: NestJS IoC container manages dependencies
- **DTO Validation**: Input validation using class-validator decorators
- **Repository Pattern**: TypeORM repositories for data access abstraction

---

## 🎨 UI/UX Features

- 🌙 **Dark Theme** - Modern dark mode interface
- 🎨 **Gradient Accents** - Beautiful gradient buttons and cards
- ✨ **Glassmorphism** - Frosted glass effects on navigation
- 🔄 **Smooth Animations** - Micro-interactions for better UX
- 📱 **Responsive Design** - Works on desktop and mobile

---

## 📝 License

This project was created for the **Ensolvers Full Stack Implementation Exercise**.

---

<div align="center">

Made with ❤️ using NestJS + React

</div>
