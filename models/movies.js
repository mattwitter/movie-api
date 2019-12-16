const Movies = (connection, Sequelize) => {
    return connection.define('movies', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: Sequelize.STRING },
        runTime: { type: Sequelize.STRING },
        releaseDate: { type: Sequelize.STRING },
        rating: { type: Sequelize.ENUM('Not Rated', 'G', 'R', 'Passed', 'PG', 'PG-13', 'Approved') },
    }, { paranoid: true })
}

module.exports = Movies