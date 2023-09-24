import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Injectable } from "@angular/core";
import * as moment from "moment";
import { Usuario } from "src/app/core/models/Usuario";
import { UsuarioService } from "../usuarioService/usuario.service";
import { ApiService } from "../apiService/api.service";
import { firstValueFrom } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private apiService: ApiService,
  ) {
    this.initiateSesion();
  }

  usuario: Usuario = null;
  public get isLogged(): boolean {
    return this.isLoggedIn();
  }
  get usuarioId() {
    return localStorage.getItem("usuarioId");
  }

  async googleLogin(token) {
    let formData = new FormData();
    formData.append("token", token);
    try {
      let result = await firstValueFrom(
        this.http.post(this.apiService.URI + "/auth/google/login", formData),
      );
      this.setSession(result);
    } catch (err) {
      console.log(err);
    }
  }

  async login(formData: FormData) {
    try {
      let result = await firstValueFrom(
        this.http.post(this.apiService.URI + "/auth/login", formData),
      );
      this.setSession(result);
      return true;
    } catch (err) {
      return false;
    }
  }

  async register(formData: FormData) {
    try {
      var result = await firstValueFrom(
        this.http.post(this.apiService.URI + "/auth/register", formData),
      );
      this.setSession(result);
      return null;
    } catch (err) {
      return err;
    }
  }

  private async setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, "second");
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("usuarioId", authResult.usuarioId);
    this.getUsuarioAutenticado()
      .then((u) => {
        this.usuario = new Usuario(u);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("usuarioId");
    this.usuario = null;
  }

  public isLoggedIn() {
    if (moment().isBefore(this.getExpiration())) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private initiateSesion() {
    if (localStorage.getItem("id_token") !== null && this.isLoggedIn()) {
      this.getUsuarioAutenticado().then((u) => {
        this.usuario = new Usuario(u);
      });
    }
  }

  async getUsuarioAutenticado(): Promise<Usuario> {
    if (!this.isLogged) return null;
    return this.usuarioService.getUsuarioById(this.usuarioId);
  }

  updateData() {
    this.initiateSesion();
  }
}
