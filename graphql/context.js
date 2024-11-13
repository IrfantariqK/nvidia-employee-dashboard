// graphql/context.js
import { verifyToken } from "../lib/auth";

export async function createContext({ req }) {
  const token = req.headers.authorization?.split(" ")[1];
  const user = token ? verifyToken(token) : null;
  return { req, user };
}
