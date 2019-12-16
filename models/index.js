const Sequelize = require('sequelize')
const MoviesModel = require('./movies')
const DirectorsModel = require('./directors')
const GenresModel = require('./genres')
const MovieDirectorsModel = require('./movie-directors')
const MovieGenresModel = require('./movie-genres')
const allConfigs = require('../config/sequelize')

const environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
})


const Movies = MoviesModel(connection, Sequelize)
const Directors = DirectorsModel(connection, Sequelize)
const Genres = GenresModel(connection, Sequelize)
const MovieDirectors = MovieDirectorsModel(connection, Sequelize, Movies, Directors)
const MovieGenres = MovieGenresModel(connection, Sequelize, Movies, Genres)


Movies.belongsToMany(Directors, { through: 'MovieDirectors' })
Directors.belongsToMany(Movies, { through: 'MovieDirectors' })
Movies.belongsToMany(Genres, { through: 'MovieGenres' })
Genres.belongsToMany(Movies, { through: 'MovieGenres' })



module.exports = {
    Movies,
    Directors,
    Genres,
    MovieDirectors,
    MovieGenres
}