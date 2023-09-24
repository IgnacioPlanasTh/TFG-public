import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/core/models/Usuario";
import { AuthService } from "../../services/authService/auth.service";
import { UsuarioService } from "../../services/usuarioService/usuario.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public usuarioService: UsuarioService,
    private router: Router,
  ) {}

  inputBusqueda: string = "";
  ngOnInit() {}

  buscarMazos() {
    this.router.navigate(["/busqueda"], {
      queryParams: { q: this.inputBusqueda.trim() },
    });
    this.inputBusqueda = "";
  }

  logout() {
    this.authService.logout();
  }
}
