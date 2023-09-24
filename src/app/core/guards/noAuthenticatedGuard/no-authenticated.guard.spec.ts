import { TestBed } from "@angular/core/testing";

import { NoAuthenticatedGuard } from "./no-authenticated.guard";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("NoAuthenticatedGuard", () => {
  let guard: NoAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(NoAuthenticatedGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
