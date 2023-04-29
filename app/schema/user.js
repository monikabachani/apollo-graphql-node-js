const { gql } = require("apollo-server-express");

const userTypeDef = gql`
type Post {
  id: ID!
  title: String
  content: String
  userId: ID
}
  type User {
    id: ID!
    userName: String
    email: String
    password: String
  }
  type UserPost {
    id: ID!
    userName: String
    email: String
    password: String
    posts:[Post]
  }
  type UserPostRes {
    status: Boolean
    message: String
    user:[UserPost]
  }
  type CommonRes {
    status:Boolean
    message:String
    user:User
  }
  type Query {
      getUsers: UserPostRes
  }
  type Mutation {
      addUser(userName: String!, email: String!,password: String!): User
  }
  type Query {
    fetchUserbyId(id: ID!): User
  } 
  type Mutation {
    deleteUser(id: ID!): CommonRes
  }
`;

module.exports = userTypeDef;