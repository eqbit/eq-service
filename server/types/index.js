const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    watched: {type: GraphQLBoolean},
    rate: {type: GraphQLInt},
    director: {
      type: DirectorType,
      resolve(parent) {
        return Directors.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent) {
        return Movies.find({directorId: parent.id});
      },
    },
  }),
});

module.exports.DirectorType = DirectorType;
module.exports.MovieType = MovieType;
