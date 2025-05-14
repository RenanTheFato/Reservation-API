# Reservation API

<div>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node JS" />
  <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

## 📋 About The Project

RESTful API for scheduling rooms, places, equipment, or anything else. Developed with Node.js + Typescript, server with Fastify, PostgreSQL database, integration with Redis and containerization with Docker.

## 📦 Developed Features
- CRUD
- Routes for Users, Rooms and Reservations
- Role-based Private Routes
- Creation of an Application Logger
- User and Administrator Authentication
- Role-based Permission Validation
- Business Rules for Handling Reservations
- Jobs for Releasing Reservations and Updating Statuses
- Application Documentation via Swagger

## 🌐 Web Access
### You can access the API now and online!

<a href="https://reservation-api-j0vn.onrender.com/docs"><img src="https://img.shields.io/badge/swagger-339933?style=for-the-badge&logo=swagger&logoColor=white" alt="Swagger" /></a>

---

## 💻 Installation
### 🛠️Dependency
> [!IMPORTANT]
> Docker is required for this application. If you're using Windows, Redis requires WSL (Windows Subsystem for Linux) to function properly. Make sure Docker and WSL are properly installed and configured before proceeding.

## 1. Installation via Docker

- ### 1.1 Clone The Repository  
 ```bash
 git clone https://github.com/RenanTheFato/Reservation-API.git
 cd Reservation-API
```
- ### 1.2 Create a .env file
```bash
# Windows
echo. > .env

# MacOS/Linux
touch .env
```
### Edit the .env file and set your preferred values for:
```env
# Database ENV
POSTGRES_USER="your-user"
POSTGRES_PASSWORD="your-password"
POSTGRES_DB="your-database"
DATABASE_URL="your-url"

# App ENV
PORT=your-number-port
JWT_SECRET="your-hash"

# Redis ENV
REDIS_HOST="your-host"
REDIS_PORT=your-number-port
REDIS_PASSWORD="your-password (if exists)"
```
- ### 1.3 Up The Docker Container
```bash
docker-compose up -d
```
- ### 1.4 Access The Application
```bash
http://localhost:PORT
```
  Replace PORT with the value you set in your .env file (default: 3333).
- ### 1.5 Access API Documentation
```bash
http://localhost:PORT/docs
```
- ### 1.6 Docker Commands
```bash
# Stop containers
docker-compose down

# Rebuild containers (after code or dependency changes)
docker-compose up --build -d

# View container logs
docker-compose logs -f

# Access container shell
docker exec -it reservation-api sh
```

---

## 2 Local Installation (Docker for Redis only)
- ### 2.1 Clone The Repository  
 ```bash
 git clone https://github.com/RenanTheFato/Reservation-API.git
 cd Reservation-API
```
- ### 2.2 Create a .env file
```bash
# Windows
echo. > .env

# MacOS/Linux
touch .env
```
### Edit the .env file and set your preferred values for:
```env
# Database ENV
POSTGRES_USER="your-user"
POSTGRES_PASSWORD="your-password"
POSTGRES_DB="your-database"
DATABASE_URL="your-url"

# App ENV
PORT=your-number-port
JWT_SECRET="your-hash"

# Redis ENV
REDIS_HOST="your-host"
REDIS_PORT=your-number-port
REDIS_PASSWORD="your-password (if exists)"
```
- ### 2.3 Start Redis via Docker
```bash
docker-compose -f docker-compose-redis.yml up -d
```
- ### 2.4 Install Dependencies and Run the API Locally
```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start the application
npm run dev

## For build the application:
npm run build

## And
npm run start
```
- ### 2.6 Access The Application
```bash
http://localhost:PORT
```
  Replace PORT with the value you set in your .env file (default: 3333).
- ### 2.7 Access API Documentation
```bash
http://localhost:PORT/docs
```
- ### 2.8 Stop the Redis Docker Container
```bash
# When you stop the app remind to stop the container
docker-compose -f docker-compose-redis.yml down
```
## 📁 Project Structure

```
reservation-api/
├── prisma/
├── public/
├── src/
│   ├── @types/
│   ├── config/
│   ├── controllers/
│   │     ├── reservations/
│   │     ├── rooms/
│   │     └──users/
│   ├── docs/
│   │   └── schemas/
│   │     ├── admin/
│   │     ├── reservations/
│   │     ├── rooms/
│   │     └──users/
│   ├── interfaces/
│   ├── jobs/
│   │   ├── processors/
│   │   ├── queues/
│   │   └──workers/
│   ├── middlewares/
│   ├── plugins/
│   ├── services/
│   │     ├── reservations/
│   │     ├── rooms/
│   │     └──users/
│   └── utils/
├── routes.ts
├── server.ts
├── .gitignore
├── docker-compose-redis.yml
├── docker-compose.yml
├── dockerfile
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```
## 👥 Contribution

### Share the project


## 📧 Contact

Renan - [GitHub](https://github.com/RenanTheFato)

Renan - [Linkedin](www.linkedin.com/in/renan-santana007)

Email - <a href="mailto:renan.santana007@hotmail.com">renan.santana007@hotmail.com</a>

Project Link: [https://github.com/RenanTheFato/Reservation-API](https://github.com/RenanTheFato/Reservation-API)
