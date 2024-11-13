// graphql/schema.js
import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Float!
  }

  type Query {
    employees(page: Int, limit: Int, sortBy: String): [Employee!]!
    employee(id: ID!): Employee
    me: User # To get the currently authenticated user
  }

  type Mutation {
    addEmployee(
      name: String!
      age: Int!
      class: String!
      subjects: [String!]!
      attendance: Float!
    ): Employee!
    updateEmployee(
      id: ID!
      name: String
      age: Int
      class: String
      subjects: [String!]
      attendance: Float
    ): Employee!
    deleteEmployee(id: ID!): Boolean!
    login(email: String!, password: String!): AuthPayload
    register(email: String!, password: String!, name: String!): AuthPayload
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }

  type AuthPayload {
    token: String
    user: User
  }
`;
