import { TestBed } from "@angular/core/testing";

import { UsuarioAccessGuard } from "./usuario-access.guard";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("UsuarioAccessGuard", () => {
  let guard: UsuarioAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(UsuarioAccessGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
