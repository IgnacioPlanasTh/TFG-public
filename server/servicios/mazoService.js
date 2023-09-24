const idiomas = require("../../modelos/idiomas");
const Mazo = require("../../modelos/mazo");

async function findById(mazoId) {
  return await Mazo.findById(mazoId);
}

module.exports = {
  async checkIfDeckBelongsToAuthorizedUser(req, res, next) {
    let usuarioAutenticadoId = req.auth.sub;
    let mazoId = req.params.mazoId;
    try {
      let mazo = await findById(mazoId);
      let mazoUsuarioId = mazo.usuario.toString();
      if (mazoUsuarioId !== usuarioAutenticadoId) {
        return res
          .status(403)
          .json({ message: "No tienes permiso para acceder a este mazo" });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad request" });
    }
  },
  async checkIfDeckBelongsToAuthorizedUserOrPublic(req, res, next) {
    let usuarioAutenticadoId = req.auth.sub;
    let mazoId = req.params.mazoId;
    try {
      let mazo = await findById(mazoId);
      let mazoUsuarioId = mazo.usuario.toString();
      if (mazoUsuarioId !== usuarioAutenticadoId && mazo.privado) {
        return res
          .status(403)
          .json({ message: "No tienes permiso para acceder a este mazo" });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Bad request" });
    }
  },

  findById: findById,

  create(mazo) {
    return Mazo.create(mazo);
  },
  async findAllForUsuario(usuarioId) {
    return new Promise(function (resolve, reject) {
      Mazo.find({ usuario: usuarioId })
        .then((mazos) => resolve(mazos))
        .catch((err) => reject(err));
    });
  },
  validate(mazo) {
    let errors = [];
    if (!mazo.nombre || mazo.nombre.length === 0) {
      errors.push("El nombre es obligatorio");
    }
    if (mazo.nombre && mazo.nombre.length > 30) {
      errors.push("El nombre no puede superar los 30 caracteres");
    }

    if (mazo.descripcion && mazo.descripcion.length === 0) {
      errors.push("La descripción es obligatorio");
    }
    if (mazo.descripcion && mazo.descripcion.length > 100) {
      errors.push("La descripción no puede superar los 100 caracteres");
    }

    if (!mazo.idioma1) {
      errors.push("'idioma1' es obligatorio");
    }
    if (mazo.idioma1 && !idiomas.toSchemaEnum().values.includes(mazo.idioma1)) {
      errors.push(
        'Error en campo "idioma1". Los valores aceptados son "es","en","fr","de","it","pt","zh","ja"',
      );
    }

    if (!mazo.idioma2) {
      errors.push("'idioma2' es obligatorio");
    }
    if (mazo.idioma2 && !idiomas.toSchemaEnum().values.includes(mazo.idioma2)) {
      errors.push(
        'Error en campo "idioma2". Los valores aceptados son "es","en","fr","de","it","pt","zh","ja"',
      );
    }

    if (mazo.palabras) {
      for (let palabra of mazo.palabras) {
        if (!palabra.natal || palabra.natal.length === 0) {
          errors.push(
            "El campo 'palabra' dentro de 'palabras' debe contener la propiedad 'natal'",
          );
        }
        if (!palabra.traduccion || palabra.traduccion.length === 0) {
          errors.push(
            "El campo 'palabra' dentro de 'palabras' debe contener la propiedad 'traduccion'",
          );
        }
      }
    }
    return errors;
  },
};
