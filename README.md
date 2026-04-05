# Mini Event Management System

A backend application to manage events and bookings using Node.js, Express.js, and MySQL.

---

## Features

- Create Users
- Create Events
- Book Tickets (with transaction handling)
- View User Bookings
- Get Ticket Count using Booking Code
- Swagger API Documentation

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2
- Joi
- Swagger (OpenAPI)

---

## Project Setup

### 1. Clone Repository

git clone <your-repo-link>
cd <project-folder>

---

### 2. Install Dependencies

npm install

---

### 3. Setup Environment Variables

Create a `.env` file:

DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=your_password  
DB=EventsDB  
PORT=4000  

---

## Database Setup

### Using MySQL Workbench

1. Open MySQL Workbench  
2. Create database:

CREATE DATABASE EventsDB;

3. Use database:

USE EventsDB;

4. Run `events_db.sql`

---

## Run Server

npm run dev

---

## Server URL

http://localhost:4000

---

## Swagger API Docs

http://localhost:4000/api-docs

---

## API Endpoints

POST   /api/users  
GET    /api/events  
POST   /api/events  
POST   /api/bookings  
GET    /api/users/:id/bookings  
POST   /api/events/:id/attendance  

---

## Notes

- Booking API uses transactions to prevent race conditions
- booking_code is unique for each booking
- remaining_tickets is used for efficient availability check

---

## Author

Prabhjeet Singh