import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditarMazoComponent } from "./editar-mazo.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("EditarMazoComponent", () => {
  let component: EditarMazoComponent;
  let fixture: ComponentFixture<EditarMazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarMazoComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => "some-value" }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
