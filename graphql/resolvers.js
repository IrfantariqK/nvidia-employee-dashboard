// graphql/resolvers.js
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/mongodb";
import { generateToken, verifyUser } from "../lib/auth"; // Assuming these methods exist

export const resolvers = {
  Query: {
    employees: async (_, { page = 1, limit = 10, sortBy = "name" }) => {
      const { db } = await connectToDatabase();
      const skip = (page - 1) * limit;
      const employees = await db
        .collection("employees")
        .find()
        .sort({ [sortBy]: 1 })
        .skip(skip)
        .limit(limit)
        .toArray();

      return employees.map(({ _id, ...rest }) => ({
        id: _id.toString(),
        ...rest,
      }));
    },
    employee: async (_, { id }) => {
      const { db } = await connectToDatabase();
      const employee = await db
        .collection("employees")
        .findOne({ _id: ObjectId(id) });
      if (!employee) return null;
      return { id: employee._id.toString(), ...employee };
    },
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return user; // Return the authenticated user
    },
  },
  Mutation: {
    addEmployee: async (_, args) => {
      const { db } = await connectToDatabase();
      const result = await db.collection("employees").insertOne(args);
      return { id: result.insertedId.toString(), ...args };
    },
    updateEmployee: async (_, { id, ...args }) => {
      const { db } = await connectToDatabase();
      await db
        .collection("employees")
        .updateOne({ _id: ObjectId(id) }, { $set: args });
      const updatedEmployee = await db
        .collection("employees")
        .findOne({ _id: ObjectId(id) });
      return { id: updatedEmployee._id.toString(), ...updatedEmployee };
    },
    deleteEmployee: async (_, { id }) => {
      const { db } = await connectToDatabase();
      const result = await db
        .collection("employees")
        .deleteOne({ _id: ObjectId(id) });
      return result.deletedCount === 1;
    },
    // Login mutation
    login: async (_, { email, password }) => {
      // Here you should validate the email and password against your database
      const user = await verifyUser(email, password); // You need to implement this function
      if (!user) throw new Error("Invalid credentials");

      const token = generateToken(user); // Generate a JWT token
      return { token, user };
    },
    // Register mutation
    register: async (_, { email, password, name }) => {
      // Here you should check if the email is already taken
      const { db } = await connectToDatabase();
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) throw new Error("Email already exists");

      // Save the user to the database
      const result = await db
        .collection("users")
        .insertOne({ email, password, name });
      const user = { id: result.insertedId.toString(), email, name };

      const token = generateToken(user); // Generate a JWT token
      return { token, user };
    },
  },
};
