const express = require("express");
const router = express.Router();
const Usuario = require("../../modelos/usuario");

const User = require("../../modelos/user");

const jwt = require("jsonwebtoken");

const usuarioService = require("../servicios/usuarioService");
const sesionService = require("../servicios/sesionService");

const multer = require("multer");
const upload = multer();

const fs = require("fs");

router.post("/google/login", async function (req, res) {
  //token que devuelve google sin decodificar
  var token = req.fields.token;

  //se valida el token usando el certificado de google
  var esTokenValido = false;

  try {
    esTokenValido = await sesionService.validateGoogleToken(token);
  } catch (err) {}

  if (!esTokenValido) {
    res.status(400).json("el token no es válido");
  } else {
    const decodedJwt = jwt.decode(token, { complete: true });
    const payload = decodedJwt.payload;

    //Para la autentificación del usuario se procede de la siguiente manera:
    // Se busca un user con el correo electrónico recibido.
    // - Si existe, dependiendo de si ese user es de tipo GOOGLE o LOCAL:
    //    -GOOGLE: Ya hay un usuario de google registrado, no se modifica nada
    //    -LOCAL: Se crea un nuevo User de tipo GOOGLE que referencia al mismo usuarioId que el encontrado

    User.find({ email: payload.email }, function (err, users) {
      if (err) {
        res.status(500).json(err);
      } else {
        if (users.length == 0) {
          //no existe user, hay que crear un usuario y asociarlo a un user
          sesionService
            .createGoogleUserAndUsuario(payload)
            .then((user) => {
              const jwtBearerToken = sesionService.generateToken(
                user.usuarioId,
              );
              res.status(200).json({
                usuarioId: user.usuarioId,
                idToken: jwtBearerToken,
                expiresIn: process.env.CADUCIDAD_TOKEN,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
        } else {
          //existe al menos un user con ese email, verificar si existe el tipo google
          let googleUser = null;
          let localUser = null;
          for (let user of users) {
            if (user.tipo === "GOOGLE") {
              googleUser = user;
            } else if (user.tipo === "LOCAL") {
              localUser = user;
            }
          }

          if (googleUser !== null) {
            //Existe un user de google, autenticar al usuario con un token para el usuarioId
            var usuarioId = googleUser.usuarioId;
            const jwtBearerToken = sesionService.generateToken(usuarioId);
            res.status(200).json({
              usuarioId: usuarioId,
              idToken: jwtBearerToken,
              expiresIn: process.env.CADUCIDAD_TOKEN,
            });
          } else {
            //No existe un usuario de google, pero existe otro usuario. Crear un user de google y
            // Asociarlo al mismo usuarioId
            var usuarioId = localUser.usuarioId;

            var data = {
              email: payload.email,
              tipo: "GOOGLE",
              usuarioId: usuarioId,
              rol: "USER",
            };
            console.log("USUARIOID", usuarioId);
            User.create(data, function (err2, googleUser) {
              if (err2) {
                res.status(500).json(err2);
              } else {
                console.log("USUARIO DE GOOGLE CREADO CON ÉXITO");
                const jwtBearerToken = sesionService.generateToken(usuarioId);
                res.status(200).json({
                  usuarioId: usuarioId,
                  idToken: jwtBearerToken,
                  expiresIn: process.env.CADUCIDAD_TOKEN,
                });
              }
            });
          }
        }
      }
    });
  }
});

router.post("/login", function (req, res) {
  var correo = req.fields.correo;
  var contraseña = req.fields.contraseña;
  sesionService.valdiateCredentials(correo, contraseña).then((validos) => {
    if (validos) {
      usuarioService.findUsuarioIdForEmail(correo).then((usuarioId) => {
        const jwtBearerToken = sesionService.generateToken(usuarioId);
        res.status(200).json({
          usuarioId: usuarioId,
          idToken: jwtBearerToken,
          expiresIn: process.env.CADUCIDAD_TOKEN,
        });
      });
    } else {
      res.sendStatus(400);
    }
  });
});

router.post("/register", async function (req, res) {
  let correo = req.fields.correo,
    contraseña = req.fields.contraseña,
    nombre = req.fields.nombre,
    apellido = req.fields.apellido,
    apodo = req.fields.apodo,
    idioma = req.fields.idioma;

  let avatar = req.files.image;
  let img = null;
  // TODO: Comprobaciones

  // Creación del usuario
  if (avatar) {
    img = {
      data: fs.readFileSync(avatar.path),
      contentType: avatar.type,
    };
  }
  var hashPassword = sesionService.hashPassword(contraseña);
  var usuarioSchema = {
    nombre: nombre,
    apellido: apellido,
    idioma: idioma,
    apodo: apodo,
    avatar: img,
  };
  let usuario;

  try {
    let usuarioId;
    let usuarioGoogleConMismoCorreo = await Usuario.findOne({
      email: correo,
      tipo: "GOOGLE",
    });

    if (usuarioGoogleConMismoCorreo) {
      usuarioId = usuarioGoogleConMismoCorreo._id;
    } else {
      usuario = await Usuario.create(usuarioSchema);
      usuarioId = usuario._id;
    }

    const userSchema = {
      usuarioId: usuarioId,
      email: correo,
      password: hashPassword,
    };

    const user = await User.create(userSchema);

    const jwtBearerToken = sesionService.generateToken(usuarioId);

    res.status(200).json({
      usuarioId: usuarioId,
      idToken: jwtBearerToken,
      expiresIn: process.env.CADUCIDAD_TOKEN,
    });
  } catch (error) {
    if (usuario && usuario._id) {
      await Usuario.deleteOne({ _id: usuario._id });
    }

    res.status(400).json(["El email ya está registrado en la aplicación"]);
  }
});

module.exports = router;
