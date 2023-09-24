import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectIdiomasComponent } from "./select-idiomas.component";
import { FormsModule } from "@angular/forms";

describe("SelectIdiomasComponent", () => {
  let component: SelectIdiomasComponent;
  let fixture: ComponentFixture<SelectIdiomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectIdiomasComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
