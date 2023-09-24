import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { IntentoService } from "./intento.service";

describe("IntentoService", () => {
  let service: IntentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule
      providers: [IntentoService], // Proporciona el proveedor para IntentoService
    });
    service = TestBed.inject(IntentoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
