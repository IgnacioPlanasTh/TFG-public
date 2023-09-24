// --- index.js ---
// • This is the start (entry-point) of our application.
// • Mongoose is used to make communication with MongoDB easy and simple
// -----------------------------------------------------------------------------
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var formidable = require("express-formidable");
const compression = require("compression");
const csrf = require("csurf");

// • Creating Express instance
// test
const app = express();

// Compresión de respuestas a solicitudes
app.use(compression());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// parse multipart/formData
app.use(formidable());

//CSRF protection
app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

// Aplica csurf a todas las rutas que lo necesiten
app.use(csrfProtection);

// Agrega el token anti-CSRF a las respuestas para su uso en Angular
app.use((req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

// • Connect to MongoDB database
mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("Conectado a la base de datos!");
    if (err) {
      // We want to log if app can not connect to database
      console.log(err);
    } else {
      // If there is no error during db connection, continue proccess

      // • `/dist` is default file output of ng build command. You can change
      // that on `angular-cli.json` config file but don't forget to change below line
      // too or server will not be able to locate our front-end part of application.
      app.use(express.static(path.join(__dirname, "dist")));

      // • This is a special method called `middleware`. Every request will be
      // executed on each request. If you want to exclude a specific route to make it
      // not enter on this middleware, simply declare that route before this function

      app.use((req, res, next) => {
        // res.set('Cross-Origin-Opener-Policy', 'unsafe-none');
        next();
      });

      // • We call use() on the Express application to add the Router to handle path,
      // specifying an URL path on first parameter '/api/example'.
      app.use("/api/v1", require("./server/routes/v1-api"));

      // • Every other route that starts with `api/` but not declared above will
      // return `not-found` status. Apply your `not-found` format here.
      app.get("/api/*", (req, res) => {
        res.send({
          message: "Endpoint no encontrado",
          type: "error",
        });
      });

      app.get("/robots.txt", (req, res) => {
        res.sendFile(path.join(__dirname, "src/robots.txt"));
      });

      // • Every other route not declared above will redirect us to Angular view
      // called `index.html`. Be sure you have builded and created output files from
      // angular app.

      app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "dist/index.html"));
      });

      const PORT = process.env.PORT || 80;
      app.listen(PORT, () =>
        console.log(`Aplicación corriendo en el puerto: ${PORT}!`),
      );
    }
  },
);
