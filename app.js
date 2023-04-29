const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./app/buildSchema');
require("./config/database");

async function startApolloServer() {
    // Same ApolloServer initialization as before
    const server = new ApolloServer({schema});
  
    // Required logic for integrating with Express
    await server.start();
  
    const app = express();
  
    server.applyMiddleware({
       app,
  
       // By default, apollo-server hosts its GraphQL endpoint at the
       // server root. However, *other* Apollo Server packages host it at
       // /graphql. Optionally provide this to match apollo-server.
       path: '/'
    });
  
    // Modified server startup
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }

  startApolloServer();