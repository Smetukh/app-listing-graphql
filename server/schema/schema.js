const graphql = require('graphql');
const appsController = require('../controllers/apps.controller');
const config = require('../config');


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean } = graphql;

const Apps = require('../models/app');
const Movies = require('../models/movie');
const Directors = require('../models/director');

const AppType = new GraphQLObjectType({
	name: 'App',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: new GraphQLNonNull(GraphQLString) },
	}),
})

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    watched: { type: new GraphQLNonNull(GraphQLBoolean) },
    rate: { type: GraphQLInt },
		director: {
			type: DirectorType,
			resolve({ directorId }, args) {
				return Directors.findById(directorId);
			}
		}
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
		movies: {
			type: new GraphQLList(MovieType),
			resolve({ id }, args) {
				return Movies.find({ directorId: id });
			},
		},
  }),
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addDirector: {
			type: DirectorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, { name, age }) {
				const director = new Directors({
					name,
					age,
				});
				return director.save();
			},
		},
		addMovie: {
			type: MovieType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: GraphQLID },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
			},
			resolve(parent, { name, genre, directorId, watched, rate }) {
				const movie = new Movies({
					name,
					genre,
					directorId,
          watched,
          rate,
				});
				return movie.save();
			},
		},
		deleteDirector: {
			type: DirectorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return Directors.findByIdAndRemove(id);
			}
		},
		deleteMovie: {
			type: MovieType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return Movies.findByIdAndRemove(id);
			}
		},
		updateDirector: {
			type: DirectorType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, { id, name, age }) {
				return Directors.findByIdAndUpdate(
					id,
					{ $set: { name, age } },
					{ new: true },
				);
			},
		},
		updateMovie: {
			type: MovieType,
			args: {
				id: { type: GraphQLID },
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				directorId: { type: GraphQLID },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
			},
			resolve(parent, { id, name, genre, directorId, watched, rate }) {
				return Movies.findByIdAndUpdate(
					id,
					{ $set: { name, genre, directorId, watched, rate } },
					{ new: true },
				);
			},
		},
	}
});

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		app: {
			type: AppType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				console.log('!!!!!!!!!!!!id = ', id)
				return Apps.findById(id);
			},
		},
		movie: {
			type: MovieType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return Movies.findById(id);
			},
		},
		director: {
			type: DirectorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, { id }) {
				return Directors.findById(id);
			},
		},
		apps: {
			type: new GraphQLList(AppType),
			args: { name: { type: GraphQLString } },
			async resolve(parent, { name }) {

				console.log('!!!!!!!!!!!!config.ios_apps_dir = ', config.ios_apps_dir)
				// appsController.getiOSApps;
				let appInfo = await appsController.readDir(config.ios_apps_dir, '.ipa', 'localhost:3000/', (error, results) => {
					if (error) {
						return error;
						// res.status(400).send(error);
					} else {
						console.log('results = ', results)
						return results;
						// res.send(results);
					}
				});
				console.log('appInfo = ', appInfo)
				return Apps.find({ name: { $regex: name, $options: "i" } });
			}
		},
		movies: {
			type: new GraphQLList(MovieType),
      		args: { name: { type: GraphQLString } },
			resolve(parent, { name }) {
				return Movies.find({ name: { $regex: name, $options: "i" } });
			}
		},
		directors: {
			type: new GraphQLList(DirectorType),
      		args: { name: { type: GraphQLString } },
			resolve(parent, { name }) {
				return Directors.find({ name: { $regex: name, $options: "i" } });
			}
		},	
  	}
});

module.exports = new GraphQLSchema({
  query: Query,
	mutation: Mutation,
});
