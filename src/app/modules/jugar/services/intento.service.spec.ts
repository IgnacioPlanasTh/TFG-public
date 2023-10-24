import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { IntentoService } from "./intento.service";
import { Intento } from "src/app/core/models/Intento";
import { PalabraIntento } from "src/app/core/models/PalabraIntento";

describe("IntentoService", () => {
  let service: IntentoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IntentoService],
    });
    service = TestBed.inject(IntentoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Asegúrate de que no haya solicitudes pendientes.
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get the last attempt for a given deck", () => {
    let mazoId = 1;
    const mockData = { mazoId: 1 };
    const endpointUrl = "/api/v1/mazos/" + mazoId + "/intentos/ultimo";

    service.getUltimoIntento("" + mazoId).then((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(endpointUrl);

    // Asegúrate de que la solicitud sea un GET.
    expect(req.request.method).toBe("GET");

    // Responde a la solicitud con los datos de prueba.
    req.flush(mockData);
  });

  // should save an attempt for a given deck
  it("should save an attempt for a given deck", async () => {
    let mazoId = 1;
    const mockData = PalabraIntento.mapArray([
      {
        _id: 2,
        natal: "a",
        traduccion: "a",
        acertada: true,
      },
      {
        _id: 3,
        natal: "b",
        traduccion: "b",
        acertada: true,
      },
      {
        _id: 4,
        natal: "c",
        traduccion: "c",
        acertada: true,
      },
    ]);

    const okData = {
      acertadas: 3,
      falladas: 0,
      totales: 3,
      palabras: mockData,
    };
    const endpointUrl = "/api/v1/mazos/" + mazoId + "/intentos";

    service.guardarIntento(mazoId + "", mockData).then((data) => {
      expect(data).toEqual(okData);
    });

    const req = httpTestingController.expectOne(endpointUrl);

    // Asegúrate de que la solicitud sea un POST.
    expect(req.request.method).toBe("POST");
    req.flush(okData);
  });
});
