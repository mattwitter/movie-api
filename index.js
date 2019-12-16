const express = require('express')
const bodyParser = require('body-parser')

const { getMovies, getMovieById, getDirectorById, getGenreByGenre, createMovie } = require('./controllers/api')

const app = express()

app.get('/movies', getMovies)

app.get('/movies/:id', getMovieById)

app.get('/directors/:id', getDirectorById)

app.get('/genre/:id', getGenreByGenre)

app.post('/movies', bodyParser.json(), createMovie)



const server = app.listen(1337, () => { console.log('listening on port 1337') })

module.exports = server