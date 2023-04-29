const { gql } = require("apollo-server-express");

const postTypeDef = gql`
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
      }

    type PostUser {
        id: ID!
        title: String
        content: String
        userId: ID
        user:User
    }

    type PostUserRes {
        status: Boolean
        message: String
        post: PostUser
    }

    type createPostResponse {
        status: Boolean!
        message: String!
        Post: Post
    }
    type Query {
        getAllPosts: [Post]
    }
    type Mutation {
        createPost(title: String!, content: String!,userId: ID!): createPostResponse
    }
    type Query {
        getPostbyId(id: ID!): PostUserRes
    }
`;

module.exports = postTypeDef;