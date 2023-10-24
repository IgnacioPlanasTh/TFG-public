import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ResultadoComponent } from "./resultado.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PalabraIntento } from "src/app/core/models/PalabraIntento";
import { IntentoService } from "../../services/intento.service";
import { FechaService } from "src/app/shared/services/fechaService/fecha.service";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";
import { Title } from "@angular/platform-browser";
import { Mazo } from "src/app/core/models/Mazo";
import { Intento } from "src/app/core/models/Intento";

describe("ResultadoComponent", () => {
  let component: ResultadoComponent;
  let fixture: ComponentFixture<ResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultadoComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => "123" }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // displays the correct title
  it("should display the correct title", () => {
    // Arrange
    const titleServiceSpy = spyOn(component["titleService"], "setTitle");

    // Act
    component.ngOnInit();

    // Assert
    expect(titleServiceSpy).toHaveBeenCalledWith(
      "Resultado del intento - VocabMaster",
    );
  });
});
