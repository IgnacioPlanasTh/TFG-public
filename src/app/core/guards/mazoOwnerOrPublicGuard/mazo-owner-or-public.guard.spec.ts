import { TestBed } from "@angular/core/testing";

import { MazoOwnerOrPublicGuard } from "./mazo-owner-or-public.guard";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("MazoOwnerGuard", () => {
  let guard: MazoOwnerOrPublicGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(MazoOwnerOrPublicGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
