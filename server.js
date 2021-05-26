const path = require('path');
const express = require("express");
const morgan = require("morgan");

const { createAndSeed } = require('./db')

const app = express();
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public")); // allows for CSS files and others
app.use(require('method-override')('_method')); // needed for DELETE method
app.use(express.urlencoded({extended: false})); // needed for processing the POST

const routes = require('./routes')
app.use('/departments', routes)

app.get('/', async (req, res, next) => {
  try {
    res.redirect('/departments')
  }
  catch (ex) {
    next(ex);
  }
});
 
// app.use('*', async (req, res, next) => {
//   console.log("BAD URL")
//   res.redirect('/departments');
// });

const PORT = 1342;

const startServer = async () => {
  try {
    await createAndSeed();
    app.listen(PORT, () => {
      console.log(`App listening in port ${ PORT }`);
    });
  }
  catch (err) {
    console.log(err)
  }
}

startServer();