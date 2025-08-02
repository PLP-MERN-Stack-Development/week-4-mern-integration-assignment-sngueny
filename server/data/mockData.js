// Mock database - In a real application, this would be replaced with actual database models

const posts = [
  {
    id: "1",
    title: "Getting Started with Express.js",
    content: `Express.js is a fast, unopinionated, minimalist web framework for Node.js. It provides a robust set of features for web and mobile applications, making it one of the most popular choices for building RESTful APIs and web applications.

In this comprehensive guide, we'll explore the key features that make Express.js stand out from other Node.js frameworks. We'll cover routing, middleware, error handling, and best practices for building scalable applications.

First, let's talk about routing. Express.js provides a simple and intuitive way to define routes for your application. You can handle different HTTP methods (GET, POST, PUT, DELETE) and define route parameters and query strings with ease.

Middleware is another powerful feature of Express.js. Middleware functions are functions that have access to the request object, response object, and the next middleware function in the application's request-response cycle. They can execute code, modify request and response objects, end the request-response cycle, and call the next middleware function.

Error handling in Express.js is straightforward and flexible. You can define error-handling middleware functions that catch and process errors that occur during the request-response cycle.`,
    excerpt: "Learn the fundamentals of Express.js and discover why it's the go-to framework for Node.js developers.",
    categoryId: "1",
    author: "John Doe",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    imageUrl: "/placeholder.svg?height=400&width=600&text=Express.js",
    comments: [],
  },
  {
    id: "2",
    title: "Building RESTful APIs with Node.js",
    content: `REST (Representational State Transfer) is an architectural style for designing networked applications. When building APIs with Node.js and Express.js, following RESTful principles helps create maintainable, scalable, and intuitive APIs.

In this article, we'll explore the key principles of REST and how to implement them using Express.js. We'll cover HTTP methods, status codes, resource naming conventions, and best practices for API design.

The main HTTP methods used in RESTful APIs are:
- GET: Retrieve data from the server
- POST: Create new resources
- PUT: Update existing resources (complete replacement)
- PATCH: Partial updates to existing resources
- DELETE: Remove resources from the server

Proper status codes are crucial for API communication. Common status codes include:
- 200: OK (successful GET, PUT, PATCH)
- 201: Created (successful POST)
- 204: No Content (successful DELETE)
- 400: Bad Request (client error)
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

Resource naming should be consistent and intuitive. Use nouns for resources, not verbs, and follow a hierarchical structure when dealing with nested resources.`,
    excerpt: "Master the art of building RESTful APIs with Node.js and Express.js following industry best practices.",
    categoryId: "1",
    author: "Jane Smith",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    imageUrl: "/placeholder.svg?height=400&width=600&text=RESTful+APIs",
    comments: [],
  },
  {
    id: "3",
    title: "Database Integration with MongoDB",
    content: `MongoDB is a popular NoSQL database that works exceptionally well with Node.js applications. Its document-based structure and flexible schema make it an excellent choice for modern web applications.

In this guide, we'll explore how to integrate MongoDB with your Express.js application using Mongoose, an Object Document Mapper (ODM) that provides a straightforward, schema-based solution to model your application data.

Mongoose provides several key features:
- Schema definition and validation
- Middleware (pre and post hooks)
- Query building and population
- Connection management
- Built-in type casting

Setting up a connection to MongoDB is straightforward with Mongoose. You can connect to a local MongoDB instance or use a cloud service like MongoDB Atlas.

Schema definition allows you to structure your data and enforce validation rules. You can define required fields, default values, custom validators, and relationships between documents.

Middleware in Mongoose allows you to run functions before or after certain operations. This is useful for tasks like password hashing, data transformation, or logging.

Population is a powerful feature that allows you to reference documents in other collections and automatically replace the reference with the actual document data when querying.`,
    excerpt: "Learn how to integrate MongoDB with your Node.js applications using Mongoose for robust data management.",
    categoryId: "2",
    author: "Mike Johnson",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    imageUrl: "/placeholder.svg?height=400&width=600&text=MongoDB",
    comments: [],
  },
]

const categories = [
  {
    id: "1",
    name: "Web Development",
    description: "All about web development technologies and best practices",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Database",
    description: "Database design, optimization, and management",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "JavaScript",
    description: "JavaScript programming language and frameworks",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Backend Development",
    description: "Server-side development and API design",
    createdAt: new Date().toISOString(),
  },
]

const comments = [
  {
    id: "1",
    postId: "1",
    author: "Alice Johnson",
    content:
      "Great article! This really helped me understand Express.js better. The middleware explanation was particularly useful.",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2",
    postId: "1",
    author: "Bob Wilson",
    content: "Thanks for the detailed explanation. Looking forward to more posts about Express.js best practices.",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "3",
    postId: "2",
    author: "Carol Davis",
    content: "RESTful API design is so important. Your explanation of HTTP status codes was very clear.",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "4",
    postId: "3",
    author: "David Brown",
    content: "MongoDB with Mongoose is a powerful combination. Thanks for the comprehensive guide!",
    createdAt: new Date(Date.now() - 5400000).toISOString(),
  },
  {
    id: "5",
    postId: "1",
    author: "Emma Wilson",
    content: "I've been using Express.js for a few months now, and this article filled in some gaps in my knowledge.",
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
]

module.exports = {
  posts,
  categories,
  comments,
}
