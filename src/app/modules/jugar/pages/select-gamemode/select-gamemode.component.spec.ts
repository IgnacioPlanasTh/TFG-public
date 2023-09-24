import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SelectGamemodeComponent } from "./select-gamemode.component";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("SelectGamemodeComponent", () => {
  let component: SelectGamemodeComponent;
  let fixture: ComponentFixture<SelectGamemodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectGamemodeComponent],
      imports: [RouterModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => "some-value" }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectGamemodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
