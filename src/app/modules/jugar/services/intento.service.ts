import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Intento } from "src/app/core/models/Intento";
import { Palabra } from "src/app/core/models/Palabra";
import { PalabraIntento } from "src/app/core/models/PalabraIntento";
import { ApiService } from "src/app/shared/services/apiService/api.service";

@Injectable({
  providedIn: "root",
})
export class IntentoService {
  intento: Array<PalabraIntento> = [];
  persistido: boolean = false;

  URI: string;
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.URI = this.apiService.URI;
  }

  async getUltimoIntento(mazoId: string) {
    let url = this.apiService.URI + "/mazos/" + mazoId + "/intentos/ultimo";
    const response = await firstValueFrom(this.http.get(url));
    return response;
  }

  async guardarIntento(mazoId: string, intento: Array<PalabraIntento>) {
    const formData = new FormData();
    formData.append("intento", JSON.stringify(intento));

    let url = this.apiService.URI + "/mazos/" + mazoId + "/intentos";

    const response = await firstValueFrom(this.http.post(url, formData));
    return response;
  }

  async getIntentosForMazo(mazoId: string): Promise<any> {
    let url = this.apiService.URI + "/mazos/" + mazoId + "/intentos";
    const response = await firstValueFrom(this.http.get(url));
    return response;
  }
}
