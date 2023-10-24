import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ParejasComponent } from "./parejas.component";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Mazo } from "src/app/core/models/Mazo";

describe("ParejasComponent", () => {
  let component: ParejasComponent;
  let fixture: ComponentFixture<ParejasComponent>;
  let httpTestingController: HttpTestingController;
  const mazo = {
    _id: "1",
    descripcion: "test",
    nombre: "test",
    privado: true,
    archivado: false,
    favorito: true,
    usuario: null,
    palabras: [
      {
        _id: 2,
        natal: "a",
        traduccion: "a",
      },
      {
        _id: 3,
        natal: "b",
        traduccion: "b",
      },
      {
        _id: 4,
        natal: "c",
        traduccion: "c",
      },
    ],
    idioma1: "es",
    idioma2: "en",
    fechaCreacion: "2022-01-01T00:00:00.000Z",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParejasComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => mazo._id }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ParejasComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // mazo with words loads successfully
  it("should load mazo with words successfully", async () => {
    const req = httpTestingController.expectOne("/api/v1/mazos/" + mazo._id);
    req.flush(mazo);
    expect(req.request.method).toEqual("GET");
    component.mazo = new Mazo(mazo);
  });

  // selectPractica() sets practica to true and initializes intento
  it("should set practica to true and initialize intento when selectPractica is called", () => {
    component.mazo = new Mazo(mazo);

    component.selectPractica();

    expect(component.practica).toBeTrue();
    expect(component.intento.length).toBeGreaterThan(0);
  });

  // selectIntento() sets practica to false and initializes intento
  it("should set practica to false and initialize intento when selectIntento is called", () => {
    component.mazo = new Mazo(mazo);

    component.selectIntento();

    expect(component.practica).toBeFalse();
    expect(component.intento.length).toBeGreaterThan(0);
  });

  // mazo with no words displays error message
  it("should display error message when mazo has no words", async () => {
    const mazoServiceMock = jasmine.createSpyObj("MazoService", [
      "getMazoById",
    ]);
    const routerMock = jasmine.createSpyObj("Router", ["aa"]);
    const intentoServiceMock = jasmine.createSpyObj("IntentoService", [
      "guardarIntento",
    ]);
    const titleServiceMock = jasmine.createSpyObj("Title", ["setTitle"]);

    let mazoCopia = new Mazo(mazo);
    mazoCopia.palabras = [];
    mazoServiceMock.getMazoById.and.returnValue(Promise.resolve(mazoCopia));

    const routeMock: any = {
      paramMap: of({ get: () => mazo._id }),
    };
    const parejasComponent = new ParejasComponent(
      mazoServiceMock,
      routeMock,
      routerMock,
      intentoServiceMock,
      titleServiceMock,
    );

    await parejasComponent.ngOnInit();

    expect(mazoServiceMock.getMazoById).toHaveBeenCalledWith(mazo._id);
    expect(parejasComponent.mazo).toBeNull();
    expect(parejasComponent.error).toBeTrue();
    expect(parejasComponent.errorMsg).toBe("Este mazo no tiene palabras");
  });
});
