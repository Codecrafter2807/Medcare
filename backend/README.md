# ⚙️ Medcare Backend

The robust API powering Medcare, built with **Node.js**, **Express**, and **MongoDB**.

## 🔒 Security Features
- **JWT Authentication**: Secure token-based access.
- **Password Hashing**: Bcryptjs for secure storage.
- **Role-Based Access (RBAC)**: Strict separation between Patient and Doctor permissions.
- **Self-Ping Mechanism**: Prevents Render free tier from sleeping.

## 🛠️ Installation
```bash
npm install
```

## 🚀 Running the API
- `npm run start-dev`: Starts the server in development mode using Nodemon.
- `npm start`: Starts the server in production mode using Node.js.

## 🔑 Environment Variables
Create a `.env` file in the `backend` folder:
```text
PORT=5000
MONGO_URL=your_mongodb_atlas_uri
JWT_SECRET_KEY=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
CLIENT_SITE_URL=http://localhost:3000/
```
