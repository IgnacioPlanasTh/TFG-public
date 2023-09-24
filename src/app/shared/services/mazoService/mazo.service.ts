import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Mazo } from "src/app/core/models/Mazo";
import { ApiService } from "../apiService/api.service";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MazoService {
  URI: string;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.URI = this.apiService.URI;
  }

  async crearMazo(formData: FormData): Promise<string> {
    let response = await firstValueFrom(
      this.http.post<any>(this.URI + "/mazos", formData),
    );
    let mazoId: string = response._id;
    return mazoId;
  }

  async importarMazo(formData: FormData): Promise<any> {
    let response = await firstValueFrom(
      this.http.post<any>(this.URI + "/mazos/importar", formData),
    );
    return response;
  }

  async getMazoById(id: string): Promise<Mazo> {
    let response = await firstValueFrom(
      this.http.get<Mazo>(this.URI + "/mazos/" + id),
    );
    return response;
  }

  async updateMazo(formData: FormData) {
    let response = await firstValueFrom(
      this.http.put(this.URI + "/mazos/" + formData.get("_id"), formData),
    );
    return response;
  }

  async borrarMazo(mazoId: string) {
    let response = await firstValueFrom(
      this.http.delete(this.URI + "/mazos/" + mazoId, { observe: "response" }),
    );
    return true;
  }

  async getAllMazosForUsuario(usuarioId: string) {
    let response = await firstValueFrom(
      this.http.get<Array<Mazo>>(
        this.URI + "/usuarios/" + usuarioId + "/mazos",
      ),
    );
    return response;
  }

  async buscarMazos(
    q: string,
    idiomasNatales: string[],
    idiomasTraduccion: string[],
  ) {
    let url = this.URI + "/mazos?q=" + q;
    if (idiomasNatales.length > 0) {
      url += "&idiomasNatales=" + idiomasNatales.join(",");
    }
    if (idiomasTraduccion.length > 0) {
      url += "&idiomasTraduccion=" + idiomasTraduccion.join(",");
    }
    return await firstValueFrom(this.http.get<Array<Mazo>>(url));
  }
}
