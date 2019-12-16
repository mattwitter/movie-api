const movieGenres = (connection, Sequelize, Movies, Genres) => {
    return connection.define('movieGenres', {
        movieId: { type: Sequelize.INTEGER, primaryKey: true, reference: { model: Movies, key: 'id' } },
        genreId: { type: Sequelize.INTEGER, primaryKey: true, reference: { model: Genres, key: 'id' } }
    }, { paranoid: true })
}

module.exports = movieGenres