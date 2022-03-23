const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const usersRoutes = require('./src/routers/users')
const filmsRoutes = require('./src/routers/films')
const booksRoutes = require('./src/routers/books')

// ADD ROUTERS TO APP
//Express automatically adds "users" as a prefix - so we don't need to 
//include it in the router itself
app.use("/users", usersRoutes)
app.use("/books", booksRoutes)
app.use("/films", filmsRoutes)

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});