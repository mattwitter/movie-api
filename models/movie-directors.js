const movieDirectors = (connection, Sequelize, Movies, Directors) => {
    return connection.define('movieDirectors', {
        movieId: { type: Sequelize.INTEGER, primaryKey: true, reference: { model: Movies, key: 'id' } },
        directorId: { type: Sequelize.INTEGER, primaryKey: true, reference: { model: Directors, key: 'id' } }
    }, { paranoid: true })
}

module.exports = movieDirectors