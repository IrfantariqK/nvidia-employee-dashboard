// pages/api/graphql.js
import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { createContext } from "../../graphql/context";
import Cors from "micro-cors";

const cors = Cors();

// Create Apollo Server instance
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

// Start the server
const startServer = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false, // Disable body parser for Apollo Server
  },
};
