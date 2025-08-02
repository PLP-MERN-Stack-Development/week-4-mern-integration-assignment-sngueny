# Full-Stack Blog Application

A modern full-stack blog application built with Express.js backend and Next.js frontend, demonstrating seamless integration between client and server components.

## 🚀 Features

### Backend (Express.js)
- **RESTful API** with comprehensive endpoints
- **Input validation** using Joi
- **Error handling** middleware
- **CORS** configuration for cross-origin requests
- **Request logging** with Morgan
- **Security** headers with Helmet
- **Modular routing** structure

### Frontend (Next.js)
- **Responsive design** with Tailwind CSS
- **Dark/Light mode** support
- **Real-time search** and filtering
- **Optimistic UI updates**
- **State management** with React Context
- **Custom hooks** for API communication
- **Form validation** and error handling

### Core Functionality
- ✅ **CRUD operations** for blog posts
- ✅ **Category management** system
- ✅ **Comment system** for posts
- ✅ **Search and filtering** capabilities
- ✅ **Pagination** support
- ✅ **Image upload** support (URL-based)
- ✅ **Responsive UI** design

## 🛠 Technology Stack

### Backend
- **Express.js** - Web framework
- **Joi** - Input validation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **UUID** - Unique identifier generation

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## 📁 Project Structure

\`\`\`
mern-blog-app/
├── server/                 # Express.js backend
│   ├── routes/            # API routes
│   │   ├── posts.js       # Post endpoints
│   │   ├── categories.js  # Category endpoints
│   │   └── comments.js    # Comment endpoints
│   ├── middleware/        # Custom middleware
│   │   ├── validation.js  # Input validation
│   │   └── errorMiddleware.js
│   ├── data/             # Mock database
│   │   └── mockData.js   # Sample data
│   ├── .env.example      # Environment variables template
│   ├── package.json      # Server dependencies
│   └── server.js         # Express server setup
├── client/               # Next.js frontend
│   ├── app/             # Next.js App Router
│   ├── components/      # React components
│   ├── contexts/        # React Context providers
│   ├── hooks/          # Custom React hooks
│   ├── .env.example    # Client environment variables
│   └── package.json    # Client dependencies
└── package.json        # Root package.json
\`\`\`

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd mern-blog-app
   \`\`\`

2. **Install root dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Install server dependencies**
   \`\`\`bash
   cd server
   npm install
   \`\`\`

4. **Install client dependencies**
   \`\`\`bash
   cd ../client
   npm install
   \`\`\`

5. **Set up environment variables**
   
   **Server (.env)**
   \`\`\`bash
   cd ../server
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`
   
   **Client (.env.local)**
   \`\`\`bash
   cd ../client
   cp .env.example .env.local
   # Edit .env.local with your configuration
   \`\`\`

### Running the Application

**Development Mode (Both servers)**
\`\`\`bash
# From root directory
npm run dev
\`\`\`

**Or run separately:**

**Backend Server**
\`\`\`bash
cd server
npm run dev
# Server runs on http://localhost:5000
\`\`\`

**Frontend Client**
\`\`\`bash
cd client
npm run dev
# Client runs on http://localhost:3000
\`\`\`

## 📚 API Documentation

### Posts Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (with pagination, search, filter) |
| GET | `/api/posts/:id` | Get specific post |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update existing post |
| DELETE | `/api/posts/:id` | Delete post |

### Categories Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/:id` | Get specific category |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### Comments Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/comments/post/:postId` | Get comments for post |
| POST | `/api/comments/post/:postId` | Add comment to post |
| PUT | `/api/comments/:id` | Update comment |
| DELETE | `/api/comments/:id` | Delete comment |

### Query Parameters

**Posts (`/api/posts`)**
- `q` - Search query (searches title, content, author)
- `categoryId` - Filter by category ID
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Comments (`/api/comments/post/:postId`)**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## 🔧 Configuration

### Environment Variables

**Server (.env)**
\`\`\`env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
\`\`\`

**Client (.env.local)**
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Blog App
\`\`\`

## 🎨 UI Components

The application uses a modern, responsive design with:
- **Dark/Light mode** toggle
- **Mobile-first** responsive design
- **Accessible** components with proper ARIA labels
- **Loading states** and error handling
- **Optimistic updates** for better UX

## 🔄 State Management

The frontend uses React Context for global state management:
- **BlogContext** - Manages posts, categories, and UI state
- **Custom hooks** - `useApi` for API communication
- **Optimistic updates** - Immediate UI feedback

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build and deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Update `NEXT_PUBLIC_API_URL` to your backend URL
2. Build and deploy to Vercel, Netlify, or similar platform

## 🔮 Future Enhancements

- [ ] **User Authentication** (JWT-based)
- [ ] **Real Database** integration (MongoDB/PostgreSQL)
- [ ] **File Upload** for images
- [ ] **Rich Text Editor** for content
- [ ] **Email Notifications**
- [ ] **Social Media Integration**
- [ ] **SEO Optimization**
- [ ] **Performance Monitoring**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
