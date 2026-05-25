# SmartPOS - Omnichannel Retail POS & Inventory Management System

A simplified MERN POS application with authentication, product inventory, billing, sales tracking, and low-stock alerts.

## Features

- User registration and login with JWT authentication
- Protected routes for dashboard, inventory, POS, and sales
- Product CRUD: add, edit, delete, list
- Inventory dashboard with low stock alerts
- POS cart with quantity updates and checkout
- Order history and daily sales summary
- Responsive Tailwind UI

## Backend

### Run backend

1. Open terminal in `backend`
2. Install dependencies:
```powershell
npm install
```
3. Create `.env` with:
```text
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smartpos
JWT_SECRET=your_secret_key
```
> If you want to use MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.
4. Start server:
```powershell
npm run dev
```

### API routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`

## Frontend

### Run frontend

1. Open terminal in `frontend`
2. Install dependencies:
```powershell
npm install
```
3. Start Vite:
```powershell
npm run dev
```

### Notes

- Frontend proxies `/api` to `http://localhost:5000`
- Replace `.env` values with your MongoDB Atlas connection and secret key
- Cart state is now managed using React Context API

## Deployment

### Frontend on Vercel
1. Push `frontend` to a GitHub repo.
2. In Vercel, create a new project from GitHub and select the frontend repo or folder.
3. Set build command to `npm run build` and publish directory to `dist`.
4. Add environment variables if needed, for example:
   - `VITE_API_URL=https://<your-backend-url>/api`
5. Deploy.

### Backend on Render
1. Push `backend` to GitHub.
2. In Render, create a new Web Service and connect your repo.
3. Set build command to `npm install` and start command to `npm run dev` or `node server.js`.
4. Add environment variables:
   - `PORT=5000`
   - `MONGO_URI=<your_mongodb_atlas_uri>`
   - `JWT_SECRET=<your_secret_key>`
5. Deploy and copy the service URL.

### Final setup
- In Vercel, set `VITE_API_URL` to your Render backend URL plus `/api`.
- In Render, use your Atlas URI and `JWT_SECRET`.

## Project structure

- `backend/` - Express, Mongoose, JWT authentication, routes
- `frontend/` - React, Tailwind, Vite, Axios, protected routes

## Quick demo

- Register a new user
- Add a product under `Products`
- Use `POS` to add cart items and checkout
- Track orders in `Sales`
- Watch low stock products in `Inventory`
