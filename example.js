const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

let port = 3000;

let schema = buildSchema(`
  type Query {
    postTitle: String,
    blogTitle: String
  }
`);

let root = {
  postTitle: () => {
    return 'Build a Simple GraphQL Server With Express and NodeJS';
  },
  blogTitle: () => {
    return 'scotch.io';
  }
};

const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);
