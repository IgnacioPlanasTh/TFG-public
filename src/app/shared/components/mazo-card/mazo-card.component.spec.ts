import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MazoCardComponent } from "./mazo-card.component";
import { Mazo } from "src/app/core/models/Mazo";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("MazoCardComponent", () => {
  let component: MazoCardComponent;
  let fixture: ComponentFixture<MazoCardComponent>;

  let json = {
    _id: "id",
    nombre: "Mi nombre",
    descripcion: "Mi descripcion",
    privado: false,
    archviado: false,
    favorito: false,
    usuario: "idUsuario",
    palabras: [],
    idioma1: "es",
    idioma2: "en",
    fechaCreacion: new Date(),
  };
  let mazo: Mazo = new Mazo(json);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MazoCardComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MazoCardComponent);
    component = fixture.componentInstance;
    component.mazo = mazo;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
