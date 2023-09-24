import { TestBed } from "@angular/core/testing";

import { MazoService } from "./mazo.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("MazoService", () => {
  let service: MazoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MazoService],
    });
    service = TestBed.inject(MazoService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
