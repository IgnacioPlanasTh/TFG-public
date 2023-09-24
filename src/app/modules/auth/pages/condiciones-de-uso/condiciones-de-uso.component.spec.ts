import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CondicionesDeUsoComponent } from "./condiciones-de-uso.component";

describe("CondicionesDeUsoComponent", () => {
  let component: CondicionesDeUsoComponent;
  let fixture: ComponentFixture<CondicionesDeUsoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CondicionesDeUsoComponent],
    });
    fixture = TestBed.createComponent(CondicionesDeUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
