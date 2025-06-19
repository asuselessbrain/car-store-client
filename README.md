Car Store - Online Vehicle Marketplace
======================================

Welcome to **Car Store**, a modern and user-friendly online platform for browsing, purchasing, and managing vehicle orders. This project provides an intuitive experience for both customers and administrators, offering advanced analytics, secure payment integration, and seamless user interactions.

🚀 Live Demo
------------

🔗 [**Car Store Live URL**](https://car-store-frontend-delta.vercel.app/)

📌 Features
-----------

### 🛒 **User Features**

*   Browse a wide range of cars with filters (brand, price, and model)
    
*   View detailed specifications of each car
    
*   Securely purchase vehicles using **ShurjoPay**
    
*   Manage order history and payments
    
*   Submit and view customer reviews
    

### 🛠 **Admin Dashboard**

*   View **monthly profit analytics** via a graph 📊
    
*   Track **cars sold by brand** in another graph 🚗
    
*   Manage total **users, orders, deliveries, and pending shipments**
    
*   Ensure smooth inventory and logistics management
    

### 💡 **Additional Features**

*   Fully **responsive** design for mobile, tablet, and desktop
    
*   **Fast and optimized performance** with Vite
    
*   **Secure authentication system** for users and admins
    

🏗️ Tech Stack
--------------

*   **Frontend:** React, TypeScript, Vite, Tailwind CSS
    
*   **Backend:** Node.js, Express.js, MongoDB, nodemailer
    
*   **Authentication:** JSON Web Tokens (JWT)
    
*   **Payment Integration:** ShurjoPay
    
*   **Deployment:** Vercel (Frontend), Vercel (Backend)
    

📂 Installation and Setup
-------------------------

### **1️⃣ Prerequisites**

Ensure you have the following installed:

*   Node.js (v18+ recommended)
    
*   MongoDB (local or cloud instance)


### Frontend:  

#### **2️⃣ Clone the Repository**

```bash
    git clone https://github.com/asuselessbrain/car-store-client.git
  ```

#### **3️⃣ Install Dependencies**

```bash
    cd car-store-client
    npm install
  ```

#### Run Frontend:
```bash
    npm run dev
  ```

### Backend:

#### **2️⃣ Clone the Repository**

```bash
    git clone https://github.com/asuselessbrain/Car-Store-server.git
  ```

#### **3️⃣ Install Dependencies**

```bash
    cd Car-Store-server
    npm install
  ```

### **4️⃣ Environment Variables**

Create a .env file in the backend directory and configure:

```bash
    NODE_ENV=development
    PORT=5000  
    DB_URL=your_mongodb_connection_string   
    BCYPT_SALT_ROUNDS=12  
    JWT_SECRET=your_jwt_secret  
    JWT_REFRESH_SECRET=your_jwt_refresh_secret   
    SP_ENDPOINT=https://sandbox.shurjopayment.com  
    SP_USERNAME=your_shurjopay_username 
    SP_PASSWORD=your_shurjopay_password   
    SP_PREFIX=SP  
    SP_RETURN_URL=https://car-store-frontend-delta.vercel.app/verify-order
  ```

#### Run Backend Server:

```bash
    npm run start:dev
  ```


The project will be available at [**http://localhost:5173/**](http://localhost:5173/)
    

🎯 Future Enhancements
----------------------

*   Additional **payment gateways** for flexibility
    
*   More **sorting and filtering** options for better user experience
    
*   Improved **admin analytics** for data-driven decisions
    

💡 _Enjoy seamless car shopping with Car Store!_ 🚗💨