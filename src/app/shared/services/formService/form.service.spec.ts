import { TestBed } from "@angular/core/testing";

import { FormService } from "./form.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormControl } from "@angular/forms";

describe("FormService", () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormService],
    });
    service = TestBed.inject(FormService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("test_null_file", () => {
    const control = new FormControl(null);
    const result = FormService.prototype.requiredFileType("pdf")(control);
    expect(result).toBeNull();
  });

  it("test_matching_file_type", () => {
    const file = new File([""], "file.pdf", { type: "application/pdf" });
    const control = new FormControl(file);
    const result = FormService.prototype.requiredFileType("pdf")(control);
    expect(result).toBeNull();
  });

  it("test_non_matching_file_type", () => {
    const file = new File([""], "file.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const control = new FormControl(file);
    const result = FormService.prototype.requiredFileType("pdf")(control);
    expect(result).toEqual({ requiredFileType: true });
  });

  it("test_file_with_no_extension", () => {
    const file = new File([""], "file", { type: "application/octet-stream" });
    const control = new FormControl(file);
    const result = FormService.prototype.requiredFileType("pdf")(control);
    expect(result).toEqual({ requiredFileType: true });
  });
});
