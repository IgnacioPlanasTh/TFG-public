import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ParejasComponent } from "./parejas.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("ParejasComponent", () => {
  let component: ParejasComponent;
  let fixture: ComponentFixture<ParejasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParejasComponent],
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => "some-value" }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ParejasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
