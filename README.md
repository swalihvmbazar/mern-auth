# MERN Stack Authentication System

A full-stack authentication system with React frontend and Express.js backend.


### Setup & Run

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-stack-auth
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   
   Create `.env` file in server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-auth
   JWT_SECRET=your_super_secret_jwt_key_here_change_this
   JWT_EXPIRES_IN=7d
   CLIENT_URL=http://localhost:5173
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```
   
   Create `.env` file in client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the Application**
   
   **Terminal 1** - Start backend (from `/server` directory):
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

   **Terminal 2** - Start frontend (from `/client` directory):
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:5173`

5. **Access the App**
   Open your browser and go to `http://localhost:5173`

## Usage
- **Register**: Create a new account
- **Login**: Sign in with your credentials  
- **Profile**: Access protected profile page
- **Logout**: Sign out of the application