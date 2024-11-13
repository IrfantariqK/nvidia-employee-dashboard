// lib/auth.js
import jwt from "jsonwebtoken";

// Use your own secret key for signing the JWT token
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Generate JWT token
export function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h", // Token expires in 1 hour
  });
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null; // If token is invalid, return null
  }
}

// Verify user credentials (this is a mock, replace with actual validation logic)
export async function verifyUser(email, password) {
  // In a real application, you would check this against a database
  if (email === "test@example.com" && password === "password123") {
    return { id: "1", email, name: "Test User" };
  }
  return null; // Invalid credentials
}
