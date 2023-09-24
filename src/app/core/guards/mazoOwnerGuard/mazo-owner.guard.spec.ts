import { TestBed } from "@angular/core/testing";

import { MazoOwnerGuard } from "./mazo-owner.guard";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("MazoOwnerGuard", () => {
  let guard: MazoOwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(MazoOwnerGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
