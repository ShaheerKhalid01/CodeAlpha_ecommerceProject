# 🛒 ShopNow — Full Stack E-Commerce App

A full-stack e-commerce web application built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

---

## 📸 Features

- 🛍️ Product listings with categories
- 🔍 Product detail page
- 🛒 Shopping cart with quantity control
- ✅ Checkout & order placement
- 👤 User registration & login
- 🔐 JWT-based authentication
- 🔒 Protected routes
- 👑 Admin middleware
- 📦 Order history
- 👤 User profile management
- 📱 Fully responsive design

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | Frontend framework |
| Redux Toolkit | State management |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| Tailwind CSS | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Backend framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| CORS | Cross-origin requests |

---

## 📁 Project Structure

```
ecommerce-project/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── ProtectedRoute.jsx
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── ProductListPage.jsx
│       │   ├── ProductDetailPage.jsx
│       │   ├── CartPage.jsx
│       │   ├── CheckoutPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── ProfilePage.jsx
│       │   └── OrdersPage.jsx
│       └── store/
│           ├── store.js
│           └── slices/
│               ├── authSlice.js
│               ├── productSlice.js
│               ├── cartSlice.js
│               └── orderSlice.js
│
└── backend/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── productController.js
    │   └── orderController.js
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorMiddleware.js
    ├── models/
    │   ├── User.js
    │   ├── Product.js
    │   └── Order.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   └── orderRoutes.js
    ├── .env
    └── server.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- npm or yarn

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/shopnow.git
cd shopnow
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` folder:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/profile` | Private | Get user profile |
| PUT | `/api/auth/profile` | Private | Update user profile |

### Product Routes
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get single product |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Order Routes
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/orders` | Private | Place new order |
| GET | `/api/orders/myorders` | Private | Get my orders |
| GET | `/api/orders/:id` | Private | Get order by ID |
| PUT | `/api/orders/:id/pay` | Private | Mark order as paid |

---

## 🔐 Environment Variables

```env
# Backend .env
MONGO_URI=           # MongoDB Atlas connection string
JWT_SECRET=          # Secret key for JWT tokens
PORT=5000            # Server port
NODE_ENV=development # development or production
```

---

## 👑 Admin Access

To make a user admin:

1. Open **MongoDB Compass**
2. Go to `ecommerce` database → `users` collection
3. Find your user document
4. Set `isAdmin: true`
5. Save

Admin users can create, update, and delete products.

---

## 🌐 Pages

| Page | Route | Access |
|---|---|---|
| Home | `/` | Public |
| Products | `/products` | Public |
| Product Detail | `/products/:id` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Cart | `/cart` | Private |
| Checkout | `/checkout` | Private |
| Orders | `/orders` | Private |
| Profile | `/profile` | Private |

---

## 🚀 Deployment

### Backend — Render
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. New Web Service → Connect repo
4. Set environment variables
5. Deploy

### Frontend — Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo → `frontend` folder
3. Deploy

---

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "dotenv": "^16.x",
  "bcryptjs": "^2.x",
  "jsonwebtoken": "^9.x",
  "cors": "^2.x",
  "nodemon": "^3.x"
}
```

### Frontend
```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "@reduxjs/toolkit": "^2.x",
  "react-redux": "^9.x",
  "axios": "^1.x",
  "tailwindcss": "^4.x"
}
```

---

## 🙋‍♂️ Author

**Shaheer Khalid**
- GitHub: [@shaheerKhalid](https://github.com/shaheerKhalid)
- LinkedIn: [Shaheer Khalid](https://linkedin.com/in/shaheerKhalid)
- Location: Gujrat, Punjab, Pakistan

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ as an internship project — Alhamdulillah 🤲
