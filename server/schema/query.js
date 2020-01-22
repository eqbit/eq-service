const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const MovieModel = require('../models/movie');
const DirectorModel = require('../models/director');
const {DirectorType, MovieType} = require('../types');

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return MovieModel.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return DirectorModel.findById(args.id);
      },
    },
    movieList: {
      type: new GraphQLList(MovieType),
      resolve() {
        return MovieModel.find({});
      },
    },
    directorList: {
      type: new GraphQLList(DirectorType),
      resolve() {
        return DirectorModel.find({});
      },
    },
  },
});

module.exports = Query;
