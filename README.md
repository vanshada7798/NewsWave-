# NewsWave - Real-Time News Trends Platform

## Overview
NewsWave is a real-time news trends platform built with **React + Vite** on the frontend and **Spring Boot** on the backend. The application fetches live news from multiple APIs, including **The Guardian API, NewsAPI, and GNews API**, while also allowing users to create and publish their own news articles and blogs.

## Features
- **Live News Fetching**: Integrates with GNews API to fetch top headlines and news articles.
- **User Authentication**: JWT-based authentication (Login, Sign-up, Social Login via Google/Facebook).
- **Blogging System**: Users can create, edit, delete, and comment on blogs.
- **Search & Filtering**: Search for specific news articles and filter by category, language, and country.
- **Bookmarking & Sharing**: Save favorite articles and share news on social media.
- **Fully Responsive UI**: Styled using **Material-UI** and **Tailwind CSS**.
- **Real-Time Updates**: Automatically updates news feeds.

## Tech Stack
### Frontend (React + Vite)
- **React.js** (State Management with Hooks)
- **Vite** (for fast development)
- **Material-UI & Tailwind CSS** (for UI/UX design)
- **Axios** (for API calls)
- **React Router** (for navigation)

### Backend (Spring Boot)
- **Spring Boot** (Java-based backend framework)
- **Spring Security & JWT** (for authentication)
- **Spring Data JPA & MySQL** (for database management)
- **RESTful APIs** (for data exchange)

## Installation & Setup
### Prerequisites
- **Node.js** (v16 or later)
- **Java 17** (for Spring Boot)
- **MySQL Server** (for database)

### Frontend Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/newswave.git
   cd newswave/frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
   - This command starts the Vite development server.
   - The app will run at `http://localhost:5182/`.
   - Any changes made to the source files will reflect instantly due to Hot Module Replacement (HMR).

### Backend Setup
1. **Navigate to the backend directory:**
   ```sh
   cd newswave/backend
   ```
2. **Configure the MySQL database in `application.properties`:**
   ```properties
   # Define the database connection details
   spring.datasource.url=jdbc:mysql://localhost:3306/newswave
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. **Run the backend:**
   ```sh
   mvn spring-boot:run
   ```
   - This starts the Spring Boot backend server.
   - The backend will be available at `http://localhost:8080/`.

## API Endpoints
### Blog Management
- **Get all blogs**: `GET /api/blogs` _(Fetches a list of all blogs)_
- **Create a blog**: `POST /api/blogs` _(Creates a new blog post)_
- **Delete a blog**: `DELETE /api/blogs/{id}` _(Deletes a blog post by ID)_
- **Like a blog**: `POST /api/blogs/{id}/like` _(Likes a specific blog post)_
- **Comment on a blog**: `POST /api/blogs/{id}/comment` _(Adds a comment to a blog post)_

### News Fetching
- **Get news articles**: `GET /api/news?category={category}&language={language}&country={country}` _(Fetches news articles based on category, language, and country)_

## Deployment
To deploy the project on a live server:
1. **Frontend**: Build the production bundle and deploy it to a hosting service like **Vercel, Netlify, or AWS S3**.
   ```sh
   npm run build
   ```
   - Generates an optimized production build in the `dist/` folder.
   - Upload `dist/` content to the preferred hosting provider.
2. **Backend**: Package the Spring Boot application and deploy it on **Heroku, AWS, or DigitalOcean**.
   ```sh
   mvn package
   ```
   - Creates a `JAR` file inside the `target/` directory.
   - Deploy the generated `JAR` file on a cloud hosting provider.



## License
This project is licensed under the MIT License.

---
Developed by **Vanshada Rajabhau Naware** 🚀

