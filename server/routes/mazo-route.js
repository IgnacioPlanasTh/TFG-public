const express = require("express");
const Mazo = require("../../modelos/mazo");
const Intento = require("../../modelos/intento");
const router = express.Router();
const mazoService = require("../servicios/mazoService");

router.get("/:mazoId", function (req, res) {
  let mazoId = req.params.mazoId;
  Mazo.findById(mazoId)
    .populate("usuario")
    .exec(function (err, mazo) {
      if (err) {
        console.log(err);
        res.status(404).json({ message: "Mazo no encontrado" });
      } else if (mazo == null) {
        res.status(404).json({ message: "Mazo no encontrado" });
      } else {
        res.status(200).json(mazo);
      }
    });
});

router.get("/acceso/:mazoId", function (req, res) {
  let mazoId = req.params.mazoId;
  if (!mazoId) return res.status(200).json(false);
  Mazo.findById(mazoId).exec((err, mazo) => {
    if (err) return res.status(200).json(false);
    let access = !mazo.privado || mazo.usuario.toString() === req.auth.sub;
    return res.status(200).json(access);
  });
});

router.get("", async function (req, res) {
  q = req.query.q;
  idiomasNatales = req.query.idiomasNatales;
  idiomasTraduccion = req.query.idiomasTraduccion;
  usuario = req.auth.sub;

  const filtro = {
    privado: false,
  };
  if (q) {
    filtro.$or = [
      { nombre: { $regex: new RegExp(q, "i") } },
      { descripcion: { $regex: new RegExp(q, "i") } },
    ];
  }
  if (
    idiomasNatales !== undefined &&
    idiomasNatales !== null &&
    idiomasNatales.length > 0
  ) {
    idiomasNatales = idiomasNatales.split(",");
    filtro.idioma1 = { $in: idiomasNatales };
  }

  if (
    idiomasTraduccion !== undefined &&
    idiomasTraduccion !== null &&
    idiomasTraduccion.length > 0
  ) {
    idiomasTraduccion = idiomasTraduccion.split(",");
    filtro.idioma2 = { $in: idiomasTraduccion };
  }

  Mazo.find(filtro)
    .populate("usuario") // Cargar el usuario
    .exec(function (err, mazosFiltrados) {
      if (err) {
        return res.status(400).json(err);
      }
      return res.status(200).json(mazosFiltrados);
    });
});

router.post("", function (req, res) {
  //creacion de mazo
  let usuarioId = req.fields.usuarioId,
    nombre = req.fields.nombre,
    descripcion = req.fields.descripcion,
    idioma1 = req.fields.idioma1,
    idioma2 = req.fields.idioma2,
    privado = req.fields.privado;

  let mazoSchema = {
    usuario: usuarioId,
    nombre: nombre,
    descripcion: descripcion,
    idioma1: idioma1,
    idioma2: idioma2,
    privado: privado,
  };

  mazoService.create(mazoSchema).then((mazo) => {
    res.status(200).json(mazo);
  });
});

router.post("/importar", function (req, res) {
  //importar un mazo en formato JSON
  let usuarioId, nombre, descripcion, idioma1, idioma2, privado, palabras;
  try {
    usuarioId = req.auth.sub;
    nombre = req.fields.nombre;
    descripcion = req.fields.descripcion;
    idioma1 = req.fields.idioma1;
    idioma2 = req.fields.idioma2;
    privado = req.fields.privado;
    palabras = JSON.parse(req.fields.palabras);
  } catch (err) {
    return res.status(400).json(err);
  }

  let mazoSchema = {
    usuario: usuarioId,
    nombre: nombre,
    descripcion: descripcion,
    idioma1: idioma1,
    idioma2: idioma2,
    privado: privado,
    palabras: palabras,
  };

  let errors = mazoService.validate(mazoSchema);
  if (errors.length > 0) {
    return res.status(400).json(errors);
  }

  mazoService
    .create(mazoSchema)
    .then((mazo) => {
      res.status(200).json(mazo);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.put(
  "/:mazoId",
  mazoService.checkIfDeckBelongsToAuthorizedUser,
  function (req, res) {
    let mazoId = req.params.mazoId;
    let nombre = req.fields.nombre,
      descripcion = req.fields.descripcion,
      privado = req.fields.privado,
      palabras = JSON.parse(req.fields.palabras),
      favorito = req.fields.favorito,
      archivado = req.fields.archivado;

    let filter = {
      _id: mazoId,
    };

    let update = {
      nombre: nombre,
      descripcion: descripcion,
      privado: privado,
      palabras: palabras,
    };

    if (favorito !== undefined && favorito !== null) {
      update.favorito = favorito;
    }
    if (archivado !== undefined && archivado !== null) {
      update.archivado = archivado;
    }
    Mazo.findOneAndUpdate(filter, update, { new: true }, function (err, doc) {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
      console.log("Mazo actualizado correctamente");
      res.status(200).json(doc);
    });
  },
);

router.delete(
  "/:mazoId",
  mazoService.checkIfDeckBelongsToAuthorizedUser,
  function (req, res) {
    let mazoId = req.params.mazoId;
    Mazo.deleteOne({ _id: mazoId }, function (err, doc) {
      if (err) {
        return res.status(500).json(err);
      }

      // Eliminar los intentos asociados al mazo
      Intento.deleteMany({ mazoId: mazoId }, function (err2, doc2) {
        if (err2) {
          console.log(err2);
        }
        return res.status(200).json({ ok: true });
      });
    });
  },
);

router.post(
  "/:mazoId/intentos",
  mazoService.checkIfDeckBelongsToAuthorizedUser,
  function (req, res) {
    //guardar un intento
    let mazoId = req.params.mazoId;
    let intento = JSON.parse(req.fields.intento);

    let palabrasTotales = intento.length;
    let palabrasAcertadas = intento.filter(
      (palabra) => palabra.acertada,
    ).length;

    let intentoSchema = {
      mazoId: mazoId,
      totales: palabrasTotales,
      acertadas: palabrasAcertadas,
      palabras: intento,
    };
    Intento.create(intentoSchema)
      .then((intentoCreado) => {
        res.status(200).json(intentoCreado);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
);

router.get(
  "/:mazoId/intentos",
  mazoService.checkIfDeckBelongsToAuthorizedUser,
  function (req, res) {
    //Obtener todos los intentos de un mazo
    let mazoId = req.params.mazoId;
    Intento.find({ mazoId: mazoId }, function (err, intentos) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(intentos);
      }
    });
  },
);

router.get(
  "/:mazoId/intentos/ultimo",
  mazoService.checkIfDeckBelongsToAuthorizedUser,
  function (req, res) {
    //Obtener todos los intentos de un mazo
    let mazoId = req.params.mazoId;
    Intento.find({ mazoId: mazoId }, function (err, intentos) {
      if (err) {
        res.status(500).json(err);
      } else {
        intentos.sort((a, b) => b.fecha - a.fecha);

        if (intentos.length > 0) {
          const intentoMasReciente = intentos[0];
          res.status(200).json(intentoMasReciente);
        } else {
          res
            .status(404)
            .json({ message: "No se encontraron intentos para el mazo dado" });
        }
      }
    });
  },
);

module.exports = router;
