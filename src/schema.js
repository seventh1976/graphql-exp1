const Authors = require('./data/authors');
const Posts = require('./data/posts');

let {
  // These are the basic GraphQL types need
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,

  // These is used to create required fields and arguments
  GraphQLNonNull,

  // This is the class we need to create the schema
  GraphQLSchema,
} = require('graphql');
