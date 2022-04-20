const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const app = express();
const userController = require('./controllers/userController')
const variantController = require('./controllers/variationController')

//Connection middleware for express
const cors = require("cors");
//Morgan is a logger
const morgan = require("morgan");

app.use(cors());
//Shorter than default, also including response time.
app.use(morgan("short"));

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

require("./db-utils/connect");

app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb'}));

app.use('/variants', variantController)
app.use('./profile', userController)


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("app running: " + port);
});