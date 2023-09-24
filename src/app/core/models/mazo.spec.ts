import { Mazo } from "./Mazo";

describe("Mazo", () => {
  // Tests that the constructor sets all properties correctly
  it("should set all properties correctly", () => {
    const json = {
      _id: "1",
      descripcion: "test",
      nombre: "test",
      privado: true,
      archivado: false,
      favorito: true,
      usuario: null,
      palabras: [],
      idioma1: "es",
      idioma2: "en",
      fechaCreacion: "2022-01-01T00:00:00.000Z",
    };
    const mazo = new Mazo(json);
    expect(mazo._id).toEqual("1");
    expect(mazo.descripcion).toEqual("test");
    expect(mazo.nombre).toEqual("test");
    expect(mazo.privado).toEqual(true);
    expect(mazo.archivado).toEqual(false);
    expect(mazo.favorito).toEqual(true);
    expect(mazo.usuario).toBeNull();
    expect(mazo.palabras).toEqual([]);
    expect(mazo.idioma1).toEqual("es");
    expect(mazo.idioma2).toEqual("en");
    expect(mazo.fechaCreacion.toISOString()).toEqual(
      "2022-01-01T00:00:00.000Z",
    );
  });

  // Tests that printFechaCreacion returns a string in the correct format
  it("should return a string in the correct format", () => {
    const json = {
      _id: "1",
      descripcion: "test",
      nombre: "test",
      privado: true,
      archivado: false,
      favorito: true,
      usuario: null,
      palabras: [],
      idioma1: "es",
      idioma2: "en",
      fechaCreacion: "2022-01-01T00:00:00.000Z",
    };
    const mazo = new Mazo(json);
    expect(mazo.printFechaCreacion()).toEqual("Sat Jan 01 2022");
  });

  // Tests that getUsuarioId returns the correct user ID
  it("should return the correct user ID", () => {
    const json = {
      _id: "1",
      descripcion: "test",
      nombre: "test",
      privado: true,
      archivado: false,
      favorito: true,
      usuario: {
        _id: "2",
        nombre: "test",
        apellido: "test",
        idioma: "es",
        apodo: "test",
        avatar: null,
        fechaAlta: "2022-01-01T00:00:00.000Z",
      },
      palabras: [],
      idioma1: "es",
      idioma2: "en",
      fechaCreacion: "2022-01-01T00:00:00.000Z",
    };
    const mazo = new Mazo(json);
    expect(mazo.getUsuarioId()).toEqual("2");
  });

  // Tests that the constructor handles empty arrays for palabras
  it("should handle empty arrays for palabras", () => {
    const json = {
      _id: "1",
      descripcion: "test",
      nombre: "test",
      privado: true,
      archivado: false,
      favorito: true,
      usuario: null,
      palabras: [],
      idioma1: "es",
      idioma2: "en",
      fechaCreacion: "2022-01-01T00:00:00.000Z",
    };
    const mazo = new Mazo(json);
    expect(mazo.palabras).toEqual([]);
  });

  // Tests that the constructor handles invalid date strings for fechaCreacion
  it("should handle invalid date strings for fechaCreacion", () => {
    const json = {
      _id: "1",
      descripcion: "test",
      nombre: "test",
      privado: true,
      archivado: false,
      favorito: true,
      usuario: null,
      palabras: [],
      idioma1: "es",
      idioma2: "en",
      fechaCreacion: "invalid",
    };
    const mazo = new Mazo(json);
    expect(mazo.fechaCreacion.toString()).toEqual("Invalid Date");
  });

  // Tests that map returns a new instance of Mazo
  it("should return a new instance of Mazo", () => {
    const json = {
      _id: "1",
      descripcion: "test",
      nombre: "test",
      privado: true,
      archivado: false,
      favorito: true,
      usuario: null,
      palabras: [],
      idioma1: "es",
      idioma2: "en",
      fechaCreacion: "2022-01-01T00:00:00.000Z",
    };
    const mazo = Mazo.map(json);
    expect(mazo instanceof Mazo).toBeTrue();
  });

  // Tests that mapArray returns an array of Mazo instances
  it("should return an array of Mazo instances", () => {
    const jsonArray = [
      {
        _id: "1",
        descripcion: "test",
        nombre: "test",
        privado: true,
        archivado: false,
        favorito: true,
        usuario: null,
        palabras: [],
        idioma1: "es",
        idioma2: "en",
        fechaCreacion: "2022-01-01T00:00:00.000Z",
      },
      {
        _id: "2",
        descripcion: "test2",
        nombre: "test2",
        privado: false,
        archivado: true,
        favorito: false,
        usuario: null,
        palabras: [],
        idioma1: "en",
        idioma2: "fr",
        fechaCreacion: "2022-01-02T00:00:00.000Z",
      },
    ];
    const mazos = Mazo.mapArray(jsonArray);
    expect(mazos.length).toEqual(2);
    expect(mazos[0] instanceof Mazo).toBeTrue();
    expect(mazos[1] instanceof Mazo).toBeTrue();
  });

  // Tests that the constructor handles an empty string for idioma1
  it("should handle an empty string for idioma1", () => {
    const json = {
      _id: "1",
      descripcion: "test",
      nombre: "test",
      privado: true,
      archivado: false,
      favorito: true,
      usuario: null,
      palabras: [],
      idioma1: "",
      idioma2: "en",
      fechaCreacion: "2022-01-01T00:00:00.000Z",
    };
    const mazo = new Mazo(json);
    expect(mazo.idioma1).toEqual("");
  });

  //getUsuarioId() tests

  // Tests that null is returned when usuario is null
  it("should return null when usuario is null", () => {
    const mazo = new Mazo({ usuario: null });
    expect(mazo.getUsuarioId()).toBeNull();
  });

  // Tests that null is returned when usuario is undefined
  it("should return null when usuario is undefined", () => {
    const mazo = new Mazo({});
    expect(mazo.getUsuarioId()).toBeNull();
  });

  // Tests that _id property of usuario object is returned
  it("should return _id property of usuario object", () => {
    const mazo = new Mazo({ usuario: { _id: "123" } });
    expect(mazo.getUsuarioId()).toBe("123");
  });

  // Tests that usuario property is returned when it is a string
  it("should return usuario property when it is a string", () => {
    const mazo = new Mazo({ usuario: "user123" });
    expect(mazo.getUsuarioId()).toBe("user123");
  });
});
