const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
} = require('graphql');

const MovieModel = require('../models/movie');
const DirectorModel = require('../models/director');
const {DirectorType, MovieType} = require('../types');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
      },
      resolve(parent, args) {
        const director = new DirectorModel({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        directorId: {type: GraphQLID},
        watched: {type: GraphQLBoolean},
        rate: {type: GraphQLInt},
      },
      resolve(parent, args) {
        const movie = new MovieModel({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
          watched: args.watched,
          rate: args.rate,
        });
        return movie.save();
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return DirectorModel.findByIdAndRemove(args.id);
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return MovieModel.findByIdAndRemove(args.id);
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
      },
      resolve(parent, args) {
        return DirectorModel.findByIdAndUpdate(
            args.id,
            {
              $set: {
                name: args.name,
                age: args.age,
              },
            },
            {new: true},
        );
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        directorId: {type: GraphQLID},
        watched: {type: GraphQLBoolean},
        rate: {type: GraphQLInt},
      },
      resolve(parent, args) {
        return MovieModel.findByIdAndUpdate(
            args.id,
            {
              $set: {
                name: args.name,
                genre: args.genre,
                directorId: args.directorId,
                watched: args.watched,
                rate: args.rate,
              },
            },
            {new: true},
        );
      },
    },
  },
});

module.exports = Mutation;
