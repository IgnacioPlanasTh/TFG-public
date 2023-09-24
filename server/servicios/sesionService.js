const expressJwt = require("express-jwt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
const axios = require("axios");
const sharp = require("sharp");

const Usuario = require("../../modelos/usuario");
const User = require("../../modelos/user");

// var googleCert = null;

const googleCertUri = "https://www.googleapis.com/oauth2/v3/certs";

const client = jwksClient({
  jwksUri: googleCertUri,
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

module.exports = {
  async valdiateCredentials(correo, contraseña) {
    try {
      var users = await User.find({ email: correo });
      if (users.length == 0) return false;
      existeLocalUser = false;
      localUserPassword = null;
      for (let user of users) {
        if (user.tipo === "LOCAL") {
          existeLocalUser = true;
          localUserPassword = user.password;
          break;
        }
      }
      if (!existeLocalUser) return false;
      else return bcrypt.compareSync(contraseña, localUserPassword);
    } catch (err) {
      console.error(err);
    }
  },
  hashPassword(contraseña) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(contraseña, salt);
    return hash;
  },
  generateToken(userId) {
    const jwtBearerToken = jwt.sign({}, process.env.JWT_KEY, {
      algorithm: "HS256",
      expiresIn: process.env.CADUCIDAD_TOKEN,
      subject: userId.toString(),
    });
    return jwtBearerToken;
  },

  // añade lo siguente a la request: req.auth = { iat: 1689244627, exp: 1689244799, sub: 'usuarioId' }
  checkIfAuthenticated: (req, res, next) => {
    expressJwt.expressjwt({
      secret: process.env.JWT_KEY,
      algorithms: ["HS256"],
    })(req, res, (err) => {
      if (err) {
        if (err.name === "UnauthorizedError" && err.message === "jwt expired") {
          return res.status(401).json({ message: "El token JWT ha expirado" });
        }
        return res.status(401).json({ message: "Token JWT no válido" });
      }
      next();
    });
  },

  validateGoogleToken(token) {
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(token, getKey, (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  async downloadGoogleImage(url) {
    // Descargar la imagen
    const response = await axios({
      url,
      responseType: "arraybuffer",
    });

    // Transformar la imagen con Sharp
    const { data, info } = await sharp(response.data)
      // .resize(300) // Ejemplo: redimensionar a 300px de ancho
      .toBuffer({ resolveWithObject: true });

    // Devolver el objeto con la estructura deseada
    return {
      data,
      contentType: "image/" + info.format,
    };
  },
  async createGoogleUserAndUsuario(payload) {
    nombre = payload.given_name;
    apellido = payload.family_name;
    apodo = nombre;
    var data = null;
    var avatar = await this.downloadGoogleImage(payload.picture);
    var dataUsuario = {
      nombre: nombre,
      apellido: apellido,
      apodo: apodo,
      avatar: avatar,
    };
    var usuario = await Usuario.create(dataUsuario);
    var dataUser = {
      email: payload.email,
      tipo: "GOOGLE",
      usuarioId: usuario._id,
      rol: "USER",
    };
    var user = await User.create(dataUser);
    return user;
  },
};
