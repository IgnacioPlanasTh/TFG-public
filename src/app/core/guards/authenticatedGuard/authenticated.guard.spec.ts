import { TestBed } from "@angular/core/testing";

import { AuthenticatedGuard } from "./authenticated.guard";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("AuthenticatedGuard", () => {
  let guard: AuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(AuthenticatedGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
