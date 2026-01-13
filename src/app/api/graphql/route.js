
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Task from "@/models/Task";

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    role: String
    coin: Int
    photoURL: String
    totalTasks: Int
  }

  type Task {
    _id: ID
    task_title: String
    task_detail: String
    task_image_url: String
    payable_amount: Int
    required_workers: Int
    creator_email: String
    creator_name: String
    completion_date: String
    submission_info: String
  }

  type Query {
    hello: String
    users: [User]
    tasks: [Task]
    user(email: String!): User
    topEarners: [User]
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL!",
    users: async () => {
      await dbConnect();
      return await User.find({});
    },
    tasks: async () => {
      await dbConnect();
      return await Task.find({}).sort({ createdAt: -1 });
    },
    user: async (_, { email }) => {
      await dbConnect();
      return await User.findOne({ email });
    },
    topEarners: async () => {
        await dbConnect();
        return await User.find({ role: "worker" }).sort({ coin: -1 }).limit(6);
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
