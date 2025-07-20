# 🚀 Chat App - Full Stack Real-time Chat Application

A modern, real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io. Features user authentication, instant messaging, conversation management, and responsive design.

## 📋 Project Overview

Full-stack real-time chat application with user authentication, instant messaging, and conversation management.

## 🏗️ Architecture

### Backend Architecture
- **Runtime**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Real-time**: Socket.io
- **Authentication**: JWT + bcrypt
- **Validation**: Built-in Express validation

### Frontend Architecture
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Context
- **Routing**: React Router
- **Real-time**: Socket.io client

## 📊 Database Schema

### User Model
```javascript
{
  fullName: String (required),
  username: String (required, unique),
  password: String (required, hashed),
  gender: String (enum: ["male", "female"]),
  profilePic: String (default: ""),
  timestamps: true
}
```

### Message Model
```javascript
{
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  message: String (required),
  timestamps: true
}
```

### Conversation Model
```javascript
{
  participants: [ObjectId] (ref: User),
  messages: [ObjectId] (ref: Message),
  timestamps: true
}
```

## 🔐 Authentication Flow

1. **Signup**: Email/username validation → Password hash → JWT token
2. **Login**: Credential verification → JWT token generation
3. **Protected Routes**: JWT verification middleware
4. **Token Storage**: Local storage (frontend)

## 🛣️ API Endpoints

### Auth Routes (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /logout` - User logout

### User Routes (`/api/users`)
- `GET /` - Get all users (for conversations)
- `GET /:id` - Get specific user

### Message Routes (`/api/messages`)
- `POST /send` - Send message
- `GET /:id` - Get conversation messages

## ⚡ Real-time Features (Socket.io)

### Events
- `connection` - User connects
- `disconnect` - User disconnects
- `sendMessage` - Send real-time message
- `newMessage` - Receive new message
- `typing` - Show typing indicators
- `stopTyping` - Hide typing indicators
- `userStatusUpdate` - Update user status

### Implementation
- User socket mapping for targeted messaging
- Online/offline status broadcasting
- Real-time message delivery
- Typing indicators
- Room-based messaging for scalability

## 🎯 Key Features

### ✅ Implemented
- User authentication (signup/login/logout)
- Real-time messaging with Socket.io
- Conversation management and history
- Message persistence in MongoDB
- Online/offline status tracking
- Search conversations functionality
- Responsive design for mobile/desktop
- Sound notifications
- Loading states and error handling
- Typing indicators
- User status updates

## 🔧 Technical Highlights

- **Real-time updates** without page refresh
- **JWT-based authentication** with protected routes
- **Optimistic UI updates** for better UX
- **Comprehensive error handling** with user feedback
- **Responsive design** for mobile/desktop compatibility
- **Database indexing** on frequently queried fields
- **Socket room management** for scalable user bases
- **Message pagination** for performance optimization

## 🛡️ Security Measures

- Password hashing with bcrypt (salt rounds)
- JWT token expiration and validation
- Input validation and sanitization
- Protected API routes with middleware
- CORS configuration for secure cross-origin requests
- Request size limiting to prevent abuse

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Project-Chat-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install --prefix frontend
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the application**

   **Development mode:**
   ```bash
   npm run server    # Backend only
   npm run dev       # Frontend only (in frontend directory)
   ```

   **Production mode:**
   ```bash
   npm run build     # Build frontend
   npm start         # Start production server
   ```

## 📁 Project Structure

```
Project-Chat-App/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── db/             # Database connection
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── socket/         # Socket.io configuration
│   ├── utils/          # Utility functions
│   └── server.js       # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # React contexts
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Utility functions
│   │   └── zustand/    # State management
│   └── public/         # Static assets
└── package.json
```

## 🔄 Data Flow

1. **User Login** → JWT stored → Socket connection established
2. **Send Message** → API call → Socket broadcast → UI update
3. **Receive Message** → Socket event → State update → UI re-render
4. **Conversation Switch** → State change → Load messages → Update UI

## 💡 Interview Talking Points

### Architecture Decisions
- **Socket.io for real-time** vs polling (better performance, lower latency)
- **JWT for stateless authentication** (scalable, no server-side sessions)
- **MongoDB for flexible schema** and JSON-like documents
- **Express for lightweight, unopinionated framework**
- **Zustand for lightweight state management**
- **Tailwind for rapid UI development**

### Scalability Considerations
- Database indexing on frequently queried fields (username, timestamps)
- Socket room management for large user bases
- Message pagination for performance
- Image optimization for profile pictures
- Horizontal scaling with load balancers

### Security Measures
- Password hashing with bcrypt (salt rounds)
- JWT token expiration and refresh mechanisms
- Input validation and sanitization
- Protected API routes with middleware
- CORS configuration for secure cross-origin requests

## 🎯 Quick Demo Flow

1. **Signup/Login** → Show authentication
2. **Start Conversation** → Demonstrate user search
3. **Send Message** → Show real-time functionality
4. **Switch Conversations** → Show state management
5. **Mobile View** → Show responsive design

## 🚀 Deployment Ready

### Environment Variables
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend URL for CORS

### Build Commands
- Frontend: `npm run build` (creates `/frontend/dist`)
- Backend: `npm start` (runs `server.js`)

### Run Commands
- Development: `npm run dev` (concurrent frontend/backend)
- Production: `npm start` (backend only, serves static files)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Socket.io for real-time communication
- MongoDB for flexible data storage
- React team for the amazing framework
- Tailwind CSS for utility-first styling 