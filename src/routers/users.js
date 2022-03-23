//https://expressjs.com/en/guide/routing.html

//require express
const express = require('express')

//Creating an express Router
const router = express.Router()

//Change the path to include data.js! It's now 2 directories up
const data = require('../../data.js')

//We add our routes to the router rather than the app!
//But everything else is the same. We don't need the /users 
//prefix since that will be added in index.js

//GET all users
router.get("/", (req, res) => {
  res.json({users: data.users})
})

//DELETE a user
router.delete( "/:id", (req, res) => {
  const userId = parseInt(req.params.id)

  const userToDelete = data.users.find(user => user.id === userId)
  if (!userToDelete) {
    res.status(404)
    res.json({error:"user does not exist"})
    return
  }
  
  data.users = data.users.filter(user => user!==userToDelete)
  res.json({user: userToDelete})
})

//PUT a user (update)
router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id)

  const existingUser = data.users.find(user => user.id === userId)
  if(!existingUser) {
    //404 - resource not found
    res.status(404)
    res.json({error: 'user does not exist'})
    return
  }

  if(!req.body.email) {
    //400 - bad request
    res.status(400)
    res.json({error: 'email not specified'})
    return
  }

  existingUser.email = req.body.email

  res.json({user: existingUser})
})

//Export the routes!
module.exports = router