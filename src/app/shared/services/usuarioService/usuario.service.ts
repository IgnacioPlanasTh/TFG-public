import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "src/app/core/models/Usuario";
import { ApiService } from "../apiService/api.service";
import { AuthService } from "../authService/auth.service";
import { firstValueFrom } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  URI: string;
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.URI = this.apiService.URI;
  }

  async getUsuarioById(usuarioId): Promise<Usuario> {
    return firstValueFrom(
      this.http.get<Usuario>(this.URI + "/usuarios/" + usuarioId),
    );
  }

  async update(usuarioId, formData) {
    var response = firstValueFrom(
      this.http.put(this.URI + "/usuarios/" + usuarioId, formData),
    );
    return response;
  }
}
