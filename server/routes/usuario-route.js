const express = require("express");
const Usuario = require("../../modelos/usuario");
const User = require("../../modelos/user");
const Mazo = require("../../modelos/mazo");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usuarioService = require("../servicios/usuarioService");
const mazoService = require("../servicios/mazoService");

const fs = require("fs");
const bcrypt = require("bcrypt");
const idiomas = require("../../modelos/idiomas");
const sesionService = require("../servicios/sesionService");

router.get("/:usuarioId", async function (req, res) {
  let usuarioId = req.params.usuarioId;
  try {
    var usuario = await usuarioService.findById(usuarioId);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
});

router.get("/:usuarioId/mazos", async function (req, res) {
  var usuarioId = req.params.usuarioId;
  try {
    var mazos = await mazoService.findAllForUsuario(usuarioId);
    res.status(200).json(mazos);
  } catch (err) {
    res.status(404).json("usuario no encontrado");
  }
});

router.put(
  "/:usuarioId",
  usuarioService.checkIfAuthorizedForProfile,
  async function (req, res) {
    let usuarioId = req.params.usuarioId;
    let nombre = req.fields.nombre;
    let apellido = req.fields.apellido;
    let apodo = req.fields.apodo;
    let idioma = req.fields.idioma;
    let contraseña = req.fields.contraseña;
    let avatar = req.files.image;

    //verificaciones
    if (!idiomas.toSchemaEnum().values.includes(idioma)) {
      res.status(400).json("El idioma no es aceptado por el sistema");
      return;
    }
    if (contraseña && contraseña.length < 5) {
      res.status(400).json("Contraseña demasiado corta");
      return;
    }

    let img = null;
    if (avatar) {
      try {
        img = {
          data: fs.readFileSync(avatar.path),
          contentType: avatar.type,
        };
      } catch (err) {
        res.status(400).json("Su imagen no se ha podido procesar");
        return;
      }
    }
    let hashPassword = null;
    if (contraseña) {
      try {
        let hashPassword = sesionService.hashPassword(contraseña);
        let updatedUser = await User.findOneAndUpdate(
          { usuarioId: usuarioId, tipo: "LOCAL" },
          { password: hashPassword },
          { new: true },
        );
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    let usuarioUpdate = {
      nombre: nombre,
      apellido: apellido,
      idioma: idioma,
      apodo: apodo,
    };
    if (img) {
      usuarioUpdate.avatar = img;
    }
    Usuario.findOneAndUpdate(
      { _id: usuarioId },
      usuarioUpdate,
      function (err, usuarioUpdated) {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          console.log(usuarioUpdated.toString());
          res.status(200).json(usuarioUpdated.toString());
        }
      },
    );
  },
);

router.get("", function (req, res) {
  Usuario.find(function (err, usuarios) {
    usuarios.map((u) => u.toString());
    res.status(200).json(usuarios);
  });
});

module.exports = router;
