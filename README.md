# Blog Application

## Project Title
Blog Application

## Description
This project is a backend for a blog application allowing users to register, log in, create posts with images, and update or delete their content. It features user authentication via JWT and file uploads through Cloudinary.

## Tech Stack
- Node.js
- Express
- MongoDB with Mongoose
- Cloudinary for image storage
- JWT for authentication
- Multer for file uploads
- ReactJs
## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following variables:
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
4. Start the server with `npm run dev` or `node server.js`.

## Usage
- Register a new user: `POST /api/users/register`
- Log in: `POST /api/users/login`
- Create, update, or delete posts using the authenticated endpoints.
- View all posts or a single post without authentication.

## Features
- User registration and login with secure password hashing.
- JWT-based authentication protecting specific routes.
- Create, update, retrieve, and delete blog posts.
- Image uploads stored on Cloudinary.
- Role-based access allowing users to manage their posts.

## API Endpoints

### User Endpoints
- **Register User**  
  `POST /api/users/register`  
  Request body:  
  ```json
  {
    "username": "your_username",
    "email": "your_email",
    "password": "your_password"
  }
  ```  
  Response: Success message.

- **Login User**  
  `POST /api/users/login`  
  Request body:  
  ```json
  {
    "email": "your_email",
    "password": "your_password"
  }
  ```  
  Response: JWT token and user object.

### Post Endpoints
- **Create Post**  
  `POST /api/posts/` or `POST /api/posts/my-posts` (with image upload)  
  Request body:  
  ```json
  {
    "title": "Post Title",
    "content": "Post Content"
  }
  ```  
  Response: Created post data.

- **Get All Posts**  
  `GET /api/posts/`  
  Response: Array of posts.

- **Get Single Post**  
  `GET /api/posts/:id`  
  Response: Post details.

- **Update Post**  
  `PUT /api/posts/:id` or `PUT /api/posts/my-posts/:id`  
  Request body: Updated title or content.

- **Delete Post**  
  `DELETE /api/posts/:id` or `DELETE /api/posts/my-posts/:id`  
  Response: Success message.

### Auth Middleware
- Protects routes that require authentication by verifying the JWT token sent in the Authorization header.

## Screenshots
_Add screenshots or GIFs here to showcase the application's UI or workflow._

## Deployment
- **Backend**: Hosted on Vercel.
- **Frontend**: Hosted on Netlify.

## Contributing
Contributions are welcome. Please fork the repository and create a pull request for any additional features or bug fixes.

## License
This project is licensed under the MIT License.

## Contact Information
For any queries or support, please contact [your-email@example.com].
