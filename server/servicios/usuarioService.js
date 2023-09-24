const User = require("../../modelos/user");
const Usuario = require("../../modelos/usuario");

module.exports = {
  checkIfAuthorizedForProfile(req, res, next) {
    let usuarioAutenticadoId = req.auth.sub;
    let perfilId = req.params.usuarioId;

    if (usuarioAutenticadoId !== perfilId) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para acceder a este perfil" });
    }
    next();
  },

  async findById(id) {
    return await Usuario.findById(id);
  },
  async findUsuarioIdForEmail(correo) {
    var user = await User.findOne({ email: correo });
    if (user !== null) {
      return user.usuarioId;
    } else {
      throw new Error("usuario no encontrado");
    }
  },
  async findById(usuarioId) {
    return new Promise((resolve, reject) => {
      Usuario.findById(usuarioId, function (err, usuario) {
        if (err) {
          reject(err);
        } else {
          resolve(usuario);
        }
      });
    });
  },
};
