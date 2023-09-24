// --- example-route.js ---
// • This is an example on how a simple route should be created
// • Routes are imported on index.js file and are used to declare our simple
// API endpoints.
// • Remember, this is a simple template and I will not complicate things but
// is a good practice to create one file on which you'll import all routes
// and import that file later on index.js. This way, index.js file will be
// more clean and simple to read.
// -----------------------------------------------------------------------------

const express = require("express");
const Usuario = require("../../modelos/usuario");
const router = express.Router();
const authRouter = require("./auth-route");
const usuarioRouter = require("./usuario-route");
const mazoRouter = require("./mazo-route");
const idiomas = require("../../modelos/idiomas");
const sesionService = require("../servicios/sesionService");

router.use(function (req, res, next) {
  // res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
  res.header("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

router.use("/auth", authRouter);
router.use("/usuarios", sesionService.checkIfAuthenticated, usuarioRouter);
router.use("/mazos", sesionService.checkIfAuthenticated, mazoRouter);

router.get("/idiomas", function (req, res) {
  res.status(200).json(idiomas.toAngular());
});

module.exports = router;
