import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/mongodb";
import { generateToken, verifyUser } from "../lib/auth";

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
        .findOne({ _id: new ObjectId(id) });
      if (!employee) return null;
      return { id: employee._id.toString(), ...employee };
    },
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return user;
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
        .updateOne({ _id: new ObjectId(id) }, { $set: args });
      const updatedEmployee = await db
        .collection("employees")
        .findOne({ _id: new ObjectId(id) });
      return { id: updatedEmployee._id.toString(), ...updatedEmployee };
    },
    deleteEmployee: async (_, { id }) => {
      const { db } = await connectToDatabase();
      const result = await db
        .collection("employees")
        .deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    },
    login: async (_, { email, password }) => {
      const user = await verifyUser(email, password);
      if (!user) throw new Error("Invalid credentials");

      const token = generateToken(user);
      return { token, user };
    },
    register: async (_, { email, password, name }) => {
      const { db } = await connectToDatabase();
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) throw new Error("Email already exists");

      const result = await db
        .collection("users")
        .insertOne({ email, password, name });
      const user = { id: result.insertedId.toString(), email, name };

      const token = generateToken(user);
      return { token, user };
    },
  },
};
