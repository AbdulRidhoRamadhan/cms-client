# TerraFurni - Furniture Inventory Management System

TerraFurni is a comprehensive web application for managing furniture inventory, built with React and modern web technologies. The system consists of two main interfaces: an admin dashboard for inventory management and a public catalog view.

## 🌟 Features

### Admin Dashboard

- **Product Management**

  - Add, edit, and delete products
  - Upload product images
  - Track stock levels
  - Set prices and descriptions

- **Category Management**

  - Create and manage product categories
  - Organize products by category

- **Analytics Dashboard**

  - Real-time stock monitoring
  - Product distribution charts
  - Low stock alerts
  - Total inventory value tracking

- **User Management**
  - Add new admin users
  - Role-based access control

### Public Interface

- **Product Catalog**
  - Browse all available products
  - Search and filter functionality
  - Detailed product views
  - Real-time stock status
  - Responsive design for all devices

## 🛠 Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **UI Components**:

  - Tailwind CSS
  - Heroicons
  - Tremor (for admin analytics)
  - Chart.js (for data visualization)

- **State Management & Data Fetching**:

  - React Hooks
  - Axios
  - Lodash (for search optimization)

- **Routing**: React Router v6

### Backend

- **Language**: Go
- **Framework**: Gin
- **Database**:
  - PostgreSQL
  - GORM
- **Features**:
  - RESTful API
  - JWT Authentication
  - File Upload
  - CRUD Operations
  - Error Handling
  - Input Validation
  - Database Migration
  - Model Relationships

## 🔗 Related Repositories

- Frontend: Current repository
- Backend: [cms-go-server](https://github.com/AbdulRidhoRamadhan/cms-go-server)

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies for both admin and public interfaces:

```bash
# For admin interface
cd admin
npm install

# For public interface
cd public
npm install
```

3. Start the development servers:

```bash
# For admin interface
npm run dev

# For public interface
npm run dev
```

## 👥 Authors

- [@Abdul Ridho Ramadhan](https://github.com/abdulridhoramadhan)
