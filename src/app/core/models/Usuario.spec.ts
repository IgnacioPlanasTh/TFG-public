// Generated by CodiumAI

import { Usuario } from "./Usuario";

describe("Usuario", function () {
  // create a new instance of Usuario with valid json input
  it("should create a new instance of Usuario with valid json input", function () {
    const json = {
      _id: "123",
      nombre: "John",
      apellido: "Doe",
      idioma: "English",
      apodo: "JD",
      avatar: {
        data: "image data",
        contentType: "image/jpeg",
      },
      fechaAlta: "2021-01-01",
    };
    const usuario = new Usuario(json);
    expect(usuario._id).toBe("123");
    expect(usuario.nombre).toBe("John");
    expect(usuario.apellido).toBe("Doe");
    expect(usuario.idioma).toBe("English");
    expect(usuario.apodo).toBe("JD");
    expect(usuario.avatar.data).toBe("image data");
    expect(usuario.avatar.contentType).toBe("image/jpeg");
    expect(usuario.fechaAlta).toEqual(new Date("2021-01-01"));
  });

  // create a new instance of Usuario with json input containing all optional fields as null
  it("should create a new instance of Usuario with json input containing all optional fields as null", function () {
    const json = {
      _id: null,
      nombre: null,
      apellido: null,
      idioma: null,
      apodo: null,
      avatar: null,
      fechaAlta: null,
    };
    const usuario = new Usuario(json);
    expect(usuario._id).toBeNull();
    expect(usuario.nombre).toBeNull();
    expect(usuario.apellido).toBeNull();
    expect(usuario.idioma).toBeNull();
    expect(usuario.apodo).toBeNull();
    expect(usuario.avatar).toBeUndefined();
    expect(usuario.fechaAlta).toEqual(new Date(null));
  });

  // create a new instance of Usuario with json input containing avatar as null
  it("should create a new instance of Usuario with json input containing avatar as null", function () {
    const json = {
      _id: "123",
      nombre: "John",
      apellido: "Doe",
      idioma: "English",
      apodo: "JD",
      avatar: null,
      fechaAlta: "2021-01-01",
    };
    const usuario = new Usuario(json);
    expect(usuario._id).toBe("123");
    expect(usuario.nombre).toBe("John");
    expect(usuario.apellido).toBe("Doe");
    expect(usuario.idioma).toBe("English");
    expect(usuario.apodo).toBe("JD");
    expect(usuario.avatar).toBeUndefined();
    expect(usuario.fechaAlta).toEqual(new Date("2021-01-01"));
  });

  // create a new instance of Usuario with json input containing _id as null
  it("should create a new instance of Usuario with json input containing _id as null", function () {
    const json = {
      _id: null,
      nombre: "John",
      apellido: "Doe",
      idioma: "English",
      apodo: "JD",
      avatar: {
        data: "image data",
        contentType: "image/jpeg",
      },
      fechaAlta: "2021-01-01",
    };
    const usuario = new Usuario(json);
    expect(usuario._id).toBeNull();
    expect(usuario.nombre).toBe("John");
    expect(usuario.apellido).toBe("Doe");
    expect(usuario.idioma).toBe("English");
    expect(usuario.apodo).toBe("JD");
    expect(usuario.avatar.data).toBe("image data");
    expect(usuario.avatar.contentType).toBe("image/jpeg");
    expect(usuario.fechaAlta).toEqual(new Date("2021-01-01"));
  });

  // create a new instance of Usuario with json input containing nombre as null
  it("should create a new instance of Usuario with json input containing nombre as null", function () {
    const json = {
      _id: "123",
      nombre: null,
      apellido: "Doe",
      idioma: "English",
      apodo: "JD",
      avatar: {
        data: "image data",
        contentType: "image/jpeg",
      },
      fechaAlta: "2021-01-01",
    };
    const usuario = new Usuario(json);
    expect(usuario._id).toBe("123");
    expect(usuario.nombre).toBeNull();
    expect(usuario.apellido).toBe("Doe");
    expect(usuario.idioma).toBe("English");
    expect(usuario.apodo).toBe("JD");
    expect(usuario.avatar.data).toBe("image data");
    expect(usuario.avatar.contentType).toBe("image/jpeg");
    expect(usuario.fechaAlta).toEqual(new Date("2021-01-01"));
  });

  // create a new instance of Usuario with json input containing apellido as null
  it("should create a new instance of Usuario with json input containing apellido as null", function () {
    const json = {
      _id: "123",
      nombre: "John",
      apellido: null,
      idioma: "English",
      apodo: "JD",
      avatar: {
        data: "image data",
        contentType: "image/jpeg",
      },
      fechaAlta: "2021-01-01",
    };
    const usuario = new Usuario(json);
    expect(usuario._id).toBe("123");
    expect(usuario.nombre).toBe("John");
    expect(usuario.apellido).toBeNull();
    expect(usuario.idioma).toBe("English");
    expect(usuario.apodo).toBe("JD");
    expect(usuario.avatar.data).toBe("image data");
    expect(usuario.avatar.contentType).toBe("image/jpeg");
    expect(usuario.fechaAlta).toEqual(new Date("2021-01-01"));
  });
});
