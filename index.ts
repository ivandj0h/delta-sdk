import { serve } from "bun";
import { ApiClient } from "./src/apiClient";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get port and API base URL from environment variables
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "https://jsonplaceholder.typicode.com";

// Create an instance of ApiClient
const apiClient = new ApiClient(API_URL);

serve({
  port: Number(PORT),
  fetch(req) {
    const url = new URL(req.url);

    // Routing
    if (url.pathname === "/") {
      return new Response("Hello via Bun Server!", { status: 200 });
    }

    // Handle API route - /users
    if (url.pathname === "/users") {
      return apiClient
        .get("/users")
        .then((data) => {
          return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
          return new Response("Internal Server Error", { status: 500 });
        });
    }

    // Handle API route - /posts
    if (url.pathname === "/posts") {
      return apiClient
        .get("/posts")
        .then((data) => {
          return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          return new Response("Internal Server Error", { status: 500 });
        });
    }

    // Handle API route - /comments
    if (url.pathname === "/comments") {
      return apiClient
        .get("/comments")
        .then((data) => {
          return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          return new Response("Internal Server Error", { status: 500 });
        });
    }

    // Default 404 Not Found
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server is running on http://localhost:${PORT}`);
