//https://expressjs.com/en/guide/routing.html

//require express
const express = require('express')

//Creating an express Router
const router = express.Router()

//Change the path to include data.js! It's now 2 directories up
const data = require('../../data.js')

//We add our routes to the router rather than the app!
//But everything else is the same. We don't need the /films 
//prefix since that will be added in index.js

//GET all films
router.get("/", (req, res) => {
  res.json({films: data.films})
})

//DELETE a film
router.delete( "/:id", (req, res) => {
  const filmId = parseInt(req.params.id)

  const filmToDelete = data.films.find(film => film.id === filmId)
  if (!filmToDelete) {
    res.status(404)
    res.json({error:"film does not exist"})
    return
  }
  
  data.films = data.films.filter(film => film!==filmToDelete)
  res.json({film: filmToDelete})
})

//PUT a film (update)
router.put("/:id", (req, res) => {
  const filmId = parseInt(req.params.id)

  const existingFilm = data.films.find(film => film.id === filmId)
  if(!existingFilm) {
    //404 - resource not found
    res.status(404)
    res.json({error: 'film does not exist'})
    return
  }

  if(!req.body.runTime) {
    //400 - bad request
    res.status(400)
    res.json({error: 'runTime not specified'})
    return
  }

  existingFilm.runTime = req.body.runTime

  res.json({film: existingFilm})
})

//Export the routes!
module.exports = router