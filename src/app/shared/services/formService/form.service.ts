import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Idioma } from "src/app/core/models/Idioma";
import { ApiService } from "../apiService/api.service";

@Injectable({
  providedIn: "root",
})
export class FormService {
  URI: string;
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.URI = this.apiService.URI;
  }

  requiredFileType(type: string) {
    return (control: FormControl) => {
      const file = control.value;
      if (file) {
        const fileName = file.name;
        const extension = fileName.split(".").pop()?.toLowerCase() || "";
        if (!extension || type.toLowerCase() !== extension.toLowerCase()) {
          return { requiredFileType: true };
        }
        return null;
      }
      return null;
    };
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (value instanceof Array) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }

    return formData;
  }

  printFormData(fd) {
    fd.forEach((value, key) => {
      console.log(`Campo: ${key}, Valor: ${value}`);
    });
  }

  getIdiomas() {
    return this.http.get<Array<Idioma>>(this.URI + "/idiomas");
  }
}
