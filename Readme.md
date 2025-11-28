
---

## 🎉 VirtualEvent – Modular Node.js + TypeScript Backend

VirtualEvent is a **clean, scalable, and production-ready backend** built using **Node.js**, **Express**, and **TypeScript**.
The architecture follows a **Domain-Driven Design (DDD)** inspired modular structure that clearly separates controllers, services, domain entities, models, and middlewares.

This backend is ideal for building virtual event platforms, dashboards, user systems, or any multi-module API-heavy application.


### NOTE:Followed DI and Partial DDD


---

# 🏛️ Architecture Overview

This project uses a clean, layered architecture:







```
┌───────────────────────┐
│       Bootstrap       │ → Application initialization 
(Express, DB)
└───────────────────────┘
┌───────────────────────┐
│        Routes          │ → Defines API endpoints
└───────────────────────┘
┌───────────────────────┐
│      Controllers       │ → Handle HTTP logic
└───────────────────────┘
┌───────────────────────┐
│       Services         │ → Business logic
└───────────────────────┘
┌───────────────────────┐
│        Domain          │ → Domain entities, contracts ,validaton , repo abstraction
└───────────────────────┘
┌───────────────────────┐
│        Models          │ → Database schemas (MongoDB/Mongoose)
└───────────────────────┘
┌───────────────────────┐
│      Middlewares       │ → Auth, validation, logging, errors
└───────────────────────┘
┌───────────────────────┐
│         Utils          │ → Helper utilities
└───────────────────────┘
```

Each module is self-contained, making the codebase easy to maintain and scale.

---

# 📁 Folder Structure

```
src/
├── bootstrap/         # Express app setup, server, DB initialization
├── config/            # Environment configuration, constants
├── controllers/       # Controller handlers for routes
├── domain/            # Entity classes, domain definitions ,mongo abstract repo , zod validation repo
├── middlewares/       # Auth, validation, error handler, logger
├── models/            # Mongoose schemas and model definitions
├── routes/            # API route definitions
├── schemaTypes/       # DTOs and shared schema types
├── services/          # Core business logic for each module
├── types/             # TypeScript helper types
├── utils/             # Helper utilities
└── bin.ts             # Application entrypoint
```

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/Techharik/virutualEvent.git
cd virutualEvent
```

## 2. Install dependencies

```bash
npm install
```

## 3. Setup environment variables

```bash
cp .env.example .env
```

Fill in the `.env` file:

```
PORT = 3000
NODE_ENV=production 
JWT_SECRET =YOUR_SECRET
JWT_EXPIRE_TIME ="7h"
DB_URI = mongodb+srv://<username>:<password>@cluster1.x3exkq2.mongodb.net/event


EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_smpt_usernmae
EMAIL_PASS=your_smpt_password
```

## 4. Run the development server

```bash
npm run dev
```

## 5. Build and run for production

```bash
npm run build
npm run start
```

---

# 📡 API Overview

Each module has its own:

* Route → `/src/routes`
* Controller → `/src/controllers`
* Service → `/src/services`
* Model → `/src/models`
* Domain Entity → `/src/domain`
* Types/DTO → `/src/schemaTypes`

Example event routes look like:

```ts

//user route
router.post("/register")
router.post("/login")

//event Routes
router.post("/register", controller.createEvent);
router.get("/", controller.getAllEvents);
router.get("/:id", controller.getEventById);
router.patch("/:id", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);
router.delete("/booking", controller.regiterforEvent);
```

Each route connects to a controller, which calls a service.

