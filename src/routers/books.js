//https://expressjs.com/en/guide/routing.html

//require express
const express = require('express')

//Creating an express Router
const router = express.Router()

//Change the path to include data.js! It's now 2 directories up
const data = require('../../data.js')

//We add our routes to the router rather than the app!
//But everything else is the same. We don't need the /books 
//prefix since that will be added in index.js

//GET all books
router.get("/", (req, res) => {
  res.json({books: data.books})
})

//DELETE a user
router.delete( "/:id", (req, res) => {
  const bookId = parseInt(req.params.id)

  const bookToDelete = data.books.find(book => book.id === bookId)
  if (!bookToDelete) {
    res.status(404)
    res.json({error:"book does not exist"})
    return
  }
  
  data.books = data.books.filter(book => book!==userToDelete)
  res.json({book: bookToDelete})
})

//PUT a book (update)
router.put("/:id", (req, res) => {
  const bookId = parseInt(req.params.id)

  const existingBook = data.books.find(book => book.id === bookId)
  if(!existingBook) {
    //404 - resource not found
    res.status(404)
    res.json({error: 'book does not exist'})
    return
  }

  if(!req.body.pages) {
    //400 - bad request
    res.status(400)
    res.json({error: 'pages not specified'})
    return
  }

  existingBook.pages = req.body.pages

  res.json({book: existingBook})
})

//Export the routes!
module.exports = router
