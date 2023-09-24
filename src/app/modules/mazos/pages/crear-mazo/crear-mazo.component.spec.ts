import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CrearMazoComponent } from "./crear-mazo.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("CrearMazoComponent", () => {
  let component: CrearMazoComponent;
  let fixture: ComponentFixture<CrearMazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearMazoComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
