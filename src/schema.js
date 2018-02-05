const _ = require('lodash');

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

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represent an author",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    twitterHandle: {type: GraphQLString}
  })
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This represent a Post",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    body: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve: function(post) {
        return _.find(Authors, a => a.id == post.author_id);
      }
    }
  })
});

// This is the Root Query
const BlogQueryRootType = new GraphQLObjectType({
  name: 'BlogAppSchema',
  description: "Blog Application Schema Query Root",
  fields: () => ({
    authors: {
      type:new GraphQLList(AuthorType),
      description: "List of all Authors",
      resolve: function() {
        return Authors
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      description: "List of all Posts",
      resolve: function() {
        return Posts
      }
    }
  })
});

const BlogAppSchema = new GraphQLSchema({
  query: BlogQueryRootType
});

module.exports = BlogAppSchema;
