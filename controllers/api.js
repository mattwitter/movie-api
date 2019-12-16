const models = require('../models')

async function getMovies(request, response) {
    const movies = await models.Movies.findAll({
        include: [{
            model: models.Directors
        },
        {
            model: models.Genres
        }]
    })
    return movies
        ? response.send(movies)
        : response.sendStatus(404)
}

async function getMovieById(request, response) {
    const id = parseInt(request.params.id)

    const movie = await models.Movies.findAll({ where: { id: id }, include: [{ model: models.Directors }, { model: models.Genres }] })

    return movie
        ? response.send(movie)
        : response.sendStatus(404)
}

async function getDirectorById(request, response) {
    const id = parseInt(request.params.id)

    const director = await models.Directors.findOne({ where: { id: id }, include: [{ model: models.Movies }] })

    return director
        ? response.send(director)
        : response.sendStatus(404)
}

async function getGenreByGenre(request, response) {
    const id = request.params.id

    const genre = await models.Genres.findAll({ where: { genres: id }, include: models.Movies })

    return genre
        ? response.send(genre)
        : response.sendStatus(404)
}

async function createMovie(request, response) {
    const { title, directors, releaseDate, rating, runTime, genres } = request.body


    //format runTime
    const formatRunTime = JSON.stringify(runTime)
    if (!title || !directors || !releaseDate || !rating || !runTime || !genres) response.status(400).send('The following fields are required: title, director, releaseDate, rating, runTime, genre')

    const [newTitle] = await models.Movies.findOrCreate({
        where: { title: title },
        defaults: {
            releaseDate: releaseDate,
            rating: rating,
            runTime: formatRunTime
        }
    })

    //split genres if need be and find or create genres
    let genreIds = []
    const genreSplit = genres.split(',')
    for (let i = 0; i < genreSplit.length; i++) {
        [newGenre] = await models.Genres.findOrCreate({
            where: {
                genres: genreSplit[i].trim()
            },
        })
        genreIds.push(newGenre.id)
    }

    newTitle.setGenres(genreIds)
    await newTitle.save()

    //split directors if need be and find or create directors
    let directorIds = []
    const directorsSplit = directors.split(',')
    for (let i = 0; i < directorsSplit.length; i++) {
        [newDirector] = await models.Directors.findOrCreate({
            where: {
                directors: directorsSplit[i].trim()
            },
        })
        directorIds.push(newDirector.id)
    }

    newTitle.setDirectors(directorIds)
    await newTitle.save()



    console.log(directors)

    //output what was created
    const createdMovie = await models.Movies.findAll({
        where: { id: newTitle.id },
        include: [{
            model: models.Directors
        },
        {
            model: models.Genres
        }],
    })

    return createdMovie
        ? response.send(createdMovie)
        : response.sendStatus(404)

}


module.exports = {
    getMovies, getMovieById, getDirectorById, getGenreByGenre, createMovie
}

