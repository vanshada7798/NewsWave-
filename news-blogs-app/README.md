NewsWave - Real-Time News Trends Platform

Overview

NewsWave is a real-time news trends platform built with React + Vite on the frontend and Spring Boot on the backend. The application fetches live news from multiple APIs, including The Guardian API, NewsAPI, and GNews API, while also allowing users to create and publish their own news articles and blogs.

Features

Live News Fetching: Integrates with GNews API to fetch top headlines and news articles.

User Authentication: JWT-based authentication (Login, Sign-up, Social Login via Google/Facebook).

Blogging System: Users can create, edit, delete, and comment on blogs.

Search & Filtering: Search for specific news articles and filter by category, language, and country.

Bookmarking & Sharing: Save favorite articles and share news on social media.

Fully Responsive UI: Styled using Material-UI and Tailwind CSS.

Real-Time Updates: Automatically updates news feeds.

Tech Stack

Frontend (React + Vite)

React.js (State Management with Hooks)

Vite (for fast development)

Material-UI & Tailwind CSS (for UI/UX design)

Axios (for API calls)

React Router (for navigation)

Backend (Spring Boot)

Spring Boot (Java-based backend framework)

Spring Security & JWT (for authentication)

Spring Data JPA & MySQL (for database management)

RESTful APIs (for data exchange)

Installation & Setup

Prerequisites

Node.js (v16 or later)

Java 17 (for Spring Boot)

MySQL Server (for database)

Frontend Setup

Clone the repository:

git clone https://github.com/your-username/newswave.git
cd newswave/frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The app will run at http://localhost:5182/.

Backend Setup

Navigate to the backend directory:

cd newswave/backend

Configure the MySQL database in application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/newswave


Run the backend:

mvn spring-boot:run

The backend will run at http://localhost:8080/.

API Endpoints

Blog Management

Get all blogs: GET /api/blogs

Create a blog: POST /api/blogs

Delete a blog: DELETE /api/blogs/{id}

Like a blog: POST /api/blogs/{id}/like

Comment on a blog: POST /api/blogs/{id}/comment

News Fetching

Get news articles: GET /api/news?category={category}&language={language}&country={country}