# Lorvic Backend API

> Enterprise-grade e-commerce platform backend built with TypeScript, Express, and MongoDB

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.0-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Authentication & Authorization](#-authentication--authorization)
- [Payment Integration](#-payment-integration)
- [File Upload System](#-file-upload-system)
- [Environment Configuration](#-environment-configuration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Links](#-links)

---

## 🎯 Overview

Lorvic Backend API is a production-ready RESTful service powering a multi-vendor e-commerce platform. Built with modern TypeScript practices, it provides robust role-based access control, secure payment processing, and scalable architecture for managing vendors, customers, products, and orders.

### Project Links

| Resource | URL |
|----------|-----|
| **Live API** | [lorvic-api.vercel.app](https://lorvic-api.vercel.app/) |
| **Client Application** | [lorvic-official.vercel.app](https://lorvic-official.vercel.app/) |
| **Server Repository** | [GitHub - Server](https://github.com/zahid-official/milestone-18-server) |
| **Client Repository** | [GitHub - Client](https://github.com/zahid-official/milestone-18-client) |
| **Author** | [@zahid-official](https://github.com/zahid-official) |

---

## ✨ Key Features

### Security & Authentication
- 🔐 **JWT-based authentication** with httpOnly cookies for enhanced security
- 👥 **Role-based access control** (Admin, Vendor, Customer)
- 🔑 **Passport.js integration** with local strategy
- 🛡️ **Automatic admin bootstrapping** on first deployment
- 🔒 **Password encryption** using bcrypt with configurable salt rounds

### Business Logic
- 🏪 **Multi-vendor marketplace** with isolated product catalogs
- 📦 **Inventory management** with real-time stock tracking
- 🛒 **Complete order lifecycle** (Pending → Confirmed → Processing → Delivered)
- ❌ **Order cancellation** with automatic stock restoration
- 💳 **Stripe Checkout integration** for secure payments
- 📬 **Webhook handling** for payment confirmation and order updates

### Technical Excellence
- ✅ **Zod schema validation** for type-safe request handling
- 🔍 **Advanced query system** (pagination, search, filtering)
- ☁️ **Cloudinary integration** for media asset management
- 🧹 **Soft delete patterns** for data retention
- ⚠️ **Centralized error handling** with detailed logging
- 🚦 **Request/response middleware pipeline**

---

## 🛠 Technology Stack

### Core Framework
```
Node.js (v18+)          - Runtime environment
Express 5               - Web application framework
TypeScript              - Type-safe development
```

### Database & ODM
```
MongoDB                 - NoSQL database
Mongoose                - Object Data Modeling
```

### Authentication & Security
```
Passport.js             - Authentication middleware
JWT (jsonwebtoken)      - Token generation & verification
bcrypt                  - Password hashing
express-session         - Session management
```

### Validation & Types
```
Zod                     - Runtime type validation
TypeScript              - Compile-time type checking
```

### Payment & Storage
```
Stripe                  - Payment processing
Cloudinary              - Media storage & CDN
Multer                  - File upload handling
```

### Development Tools
```
ts-node-dev             - Development server
ESLint                  - Code linting
pnpm                    - Package management
```

---

## 🏗 Architecture

### Project Structure

```
lorvic-backend/
├── src/
│   ├── app.ts                      # Application entry point
│   ├── server.ts                   # Server initialization & DB connection
│   │
│   └── app/
│       ├── config/                 # Configuration files
│       │   ├── index.ts            # Environment variables
│       │   ├── multer.config.ts    # File upload configuration
│       │   ├── cloudinary.config.ts # Cloud storage setup
│       │   ├── stripe.config.ts    # Payment gateway setup
│       │   └── passport.config.ts  # Authentication strategy
│       │
│       ├── middlewares/            # Express middlewares
│       │   ├── auth.middleware.ts  # JWT validation & role checks
│       │   ├── validateSchema.ts   # Zod schema validation
│       │   ├── errorHandler.ts     # Global error handler
│       │   └── notFound.ts         # 404 handler
│       │
│       ├── modules/                # Feature modules
│       │   ├── auth/               # Authentication
│       │   │   ├── auth.controller.ts
│       │   │   ├── auth.service.ts
│       │   │   ├── auth.validation.ts
│       │   │   └── auth.route.ts
│       │   │
│       │   ├── user/               # User management
│       │   ├── admin/              # Admin operations
│       │   ├── vendor/             # Vendor management
│       │   ├── customer/           # Customer operations
│       │   ├── product/            # Product catalog
│       │   ├── order/              # Order processing
│       │   └── payment/            # Payment webhooks
│       │
│       ├── utils/                  # Utility functions
│       │   ├── jwtHelper.ts        # JWT generation & verification
│       │   ├── cookieHelper.ts     # Cookie management
│       │   ├── queryBuilder.ts     # Database query construction
│       │   └── responseHelper.ts   # Standardized responses
│       │
│       └── routes/                 # API route definitions
│           └── index.ts            # Route aggregator (/api/v1)
│
├── dist/                           # Compiled output
├── .env.example                    # Environment template
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies & scripts
```

### Module Architecture

Each feature module follows a consistent pattern:

```typescript
module/
├── module.interface.ts      // TypeScript interfaces
├── module.model.ts          // Mongoose schema & model
├── module.validation.ts     // Zod validation schemas
├── module.controller.ts     // Request handlers
├── module.service.ts        // Business logic
└── module.route.ts          // Express routes
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **pnpm**: Recommended package manager ([install via corepack](https://pnpm.io/installation#using-corepack))
- **MongoDB**: Atlas cluster or local instance
- **Stripe Account**: For payment processing
- **Cloudinary Account**: For media storage

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zahid-official/milestone-18-server.git
   cd milestone-18-server
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

   The server will start at `http://localhost:5000`

### Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm start` | Run production server (requires build) |
| `pnpm lint` | Run ESLint on source files |

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:5000/api/v1
Production:  https://lorvic-api.vercel.app/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/auth/login` | Public | User authentication |
| `POST` | `/auth/logout` | Authenticated | Clear session |
| `PATCH` | `/auth/changePassword` | Authenticated | Update password |

### User Management

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/user` | Admin | List all active users |
| `GET` | `/user/deletedUsers` | Admin | List soft-deleted users |
| `GET` | `/user/singleUser/:id` | Admin | Get user by ID |
| `GET` | `/user/profile` | Authenticated | Get current user profile |
| `PATCH` | `/user/profile` | Authenticated | Update profile (supports file upload) |

### Admin Operations

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/admin` | Admin | List all admins |
| `POST` | `/admin/create` | Admin | Create new admin |
| `DELETE` | `/admin/:id` | Admin | Soft delete admin |

### Vendor Management

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/vendor` | Admin | List all vendors |
| `POST` | `/vendor/create` | Admin | Create vendor account |
| `DELETE` | `/vendor/:id` | Admin | Soft delete vendor |

### Customer Operations

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/customer` | Admin | List all customers |
| `POST` | `/customer/create` | Public | Customer registration |
| `DELETE` | `/customer/:id` | Admin | Soft delete customer |

### Product Catalog

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/product` | Vendor, Admin | List products (with filters) |
| `GET` | `/product/singleProduct/:id` | Vendor, Admin | Get product details |
| `POST` | `/product/create` | Vendor | Create product (with image) |
| `PATCH` | `/product/:id` | Vendor | Update product |
| `DELETE` | `/product/:id` | Vendor | Delete product |

### Order Management

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/order` | Vendor | List vendor orders |
| `GET` | `/order/userOrders` | Customer | List customer orders |
| `GET` | `/order/singleOrder/:id` | Vendor | Get order details |
| `GET` | `/order/userOrder/:id` | Customer | Get customer order |
| `POST` | `/order/create` | Customer | Create order & checkout |
| `PATCH` | `/order/:id/in-progress` | Vendor | Mark order processing |
| `PATCH` | `/order/:id/delivered` | Vendor | Mark order delivered |
| `PATCH` | `/order/:id/cancel` | Customer | Cancel unpaid order |

### Webhooks

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/webhook` | Stripe | Payment status updates |

### Query Parameters

The API supports advanced filtering, searching, and pagination:

```
GET /api/v1/product?search=laptop&category=electronics&page=1&limit=10&sort=-createdAt
```

**Supported parameters:**
- `search`: Full-text search across fields
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sort`: Field to sort by (prefix with `-` for descending)
- Any model field for filtering

---

## 🔐 Authentication & Authorization

### Authentication Flow

1. **Login**: Client sends credentials to `/auth/login`
2. **Token Generation**: Server creates JWT tokens (access & refresh)
3. **Cookie Storage**: Tokens stored in httpOnly cookies
4. **Request Authentication**: Client includes cookies in subsequent requests
5. **Token Validation**: Middleware verifies JWT on protected routes

### Token Configuration

```typescript
Access Token:  1 hour expiry, httpOnly, secure
Refresh Token: 7 days expiry, httpOnly, secure
```

### Role Hierarchy

```
ADMIN     → Full system access
VENDOR    → Manage own products, view own orders
CUSTOMER  → Place orders, manage profile
```

### Cookie Security

```typescript
Production:
  - secure: true (HTTPS only)
  - sameSite: 'none' (cross-origin)
  - httpOnly: true (XSS prevention)

Development:
  - secure: false (HTTP allowed)
  - sameSite: 'lax'
  - httpOnly: true
```

### Frontend Integration

```javascript
// Fetch with credentials
fetch('https://lorvic-api.vercel.app/api/v1/user/profile', {
  method: 'GET',
  credentials: 'include', // Important!
  headers: {
    'Content-Type': 'application/json'
  }
});
```

---

## 💳 Payment Integration

### Stripe Checkout Flow

```
1. Customer creates order → POST /order/create
2. Server reduces stock, creates payment record (UNPAID)
3. Server generates Stripe Checkout session
4. Returns checkout URL to client
5. Customer completes payment on Stripe
6. Stripe sends webhook → POST /webhook
7. Server updates payment (PAID) and order (CONFIRMED)
```

### Order Status Lifecycle

```
PENDING → CONFIRMED → IN_PROCESSING → DELIVERED
   ↓
CANCELLED (if payment fails or customer cancels)
```

### Payment Status States

```
UNPAID    → Initial state after order creation
PAID      → Payment successful (Stripe webhook)
FAILED    → Payment declined or session expired
```

### Webhook Events Handled

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Mark payment PAID, order CONFIRMED |
| `checkout.session.expired` | Mark payment FAILED, restore stock |
| `checkout.session.async_payment_failed` | Mark payment FAILED, restore stock |

### Local Webhook Testing

```bash
# Install Stripe CLI
stripe listen --forward-to http://localhost:5000/webhook

# Use the webhook signing secret in .env
STRIPE_WEBHOOK_SECRET_KEY=whsec_xxxxxxxxxxxxx
```

---

## 📤 File Upload System

### Supported Upload Types

- **Product Thumbnails**: JPEG, PNG, WebP (max 5MB)
- **Profile Photos**: JPEG, PNG (max 2MB)

### Upload Flow

```typescript
// 1. Client sends multipart/form-data
const formData = new FormData();
formData.append('file', imageFile);
formData.append('data', JSON.stringify({
  name: 'Product Name',
  price: 99.99
}));

// 2. Multer processes upload
// 3. Cloudinary stores file
// 4. Server receives secure URL
// 5. URL saved in database
```

### Cloudinary Configuration

```typescript
Folder Structure:
  /lorvic/products/    → Product images
  /lorvic/profiles/    → User avatars

Transformations:
  - Auto format (WebP when supported)
  - Quality optimization
  - Lazy loading ready
```

### Error Handling

If a database operation fails after upload, the middleware automatically deletes the Cloudinary asset to prevent orphaned files.

---

## ⚙️ Environment Configuration

### Required Variables

Create a `.env` file in the project root:

```bash
# ================================
# DATABASE
# ================================
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/lorvic?retryWrites=true&w=majority

# ================================
# SERVER
# ================================
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# ================================
# JWT AUTHENTICATION
# ================================
JWT_ACCESS_SECRET=your-super-secret-access-key-min-32-chars
JWT_ACCESS_EXPIRESIN=1h
JWT_REFRESH_SECRET=your-super-secret-refresh-key-min-32-chars
JWT_REFRESH_EXPIRESIN=7d

# ================================
# SESSION
# ================================
EXPRESS_SESSION_SECRET=your-session-secret-min-32-chars

# ================================
# PASSWORD HASHING
# ================================
BCRYPT_SALT_ROUNDS=12

# ================================
# DEFAULT ADMIN (Auto-created on startup)
# ================================
DEFAULT_ADMIN_EMAIL=admin@lorvic.com
DEFAULT_ADMIN_PASSWORD=ChangeMe123!

# ================================
# CLOUDINARY
# ================================
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-cloudinary-secret

# ================================
# STRIPE
# ================================
STRIPE_SECRET_KEY=sk_test_51xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET_KEY=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SUCCESS_FRONTEND_URL=http://localhost:3000/payment/success
STRIPE_CANCELED_FRONTEND_URL=http://localhost:3000/payment/cancel
```

### Security Best Practices

- ✅ Use strong, randomly generated secrets (32+ characters)
- ✅ Change default admin password immediately after first login
- ✅ Never commit `.env` to version control
- ✅ Use different credentials for development and production
- ✅ Rotate secrets periodically
- ✅ Use environment-specific Stripe keys (test vs live)

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Prepare for deployment**
   ```bash
   pnpm build
   ```

2. **Configure Vercel**
   
   Create `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "dist/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "dist/server.js"
       }
     ]
   }
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set environment variables** in Vercel dashboard

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Enable Stripe live mode keys
- [ ] Set up Stripe webhook endpoint in dashboard
- [ ] Enable Cloudinary auto-optimization
- [ ] Configure CORS for production domain
- [ ] Set secure cookie flags
- [ ] Enable request rate limiting (if applicable)
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure logging service
- [ ] Test all payment flows end-to-end

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow existing TypeScript conventions
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Ensure all tests pass before submitting
- Update documentation for API changes

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Zahid Official**
- GitHub: [@zahid-official](https://github.com/zahid-official)
- Project: [Lorvic Platform](https://github.com/zahid-official/milestone-18-server)

---

## 🙏 Acknowledgments

- Express.js team for the robust framework
- Stripe for seamless payment processing
- Cloudinary for reliable media storage
- MongoDB team for excellent documentation
- All open-source contributors

---

<div align="center">

**[⬆ Back to Top](#lorvic-backend-api)**

Made with ❤️ by [Zahid Official](https://github.com/zahid-official)

</div>