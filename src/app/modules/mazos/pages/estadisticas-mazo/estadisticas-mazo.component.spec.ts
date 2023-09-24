import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EstadisticasMazoComponent } from "./estadisticas-mazo.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("EstadisticasMazoComponent", () => {
  let component: EstadisticasMazoComponent;
  let fixture: ComponentFixture<EstadisticasMazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadisticasMazoComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => "some-value" }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EstadisticasMazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
