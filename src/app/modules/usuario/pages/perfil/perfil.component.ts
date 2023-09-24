import { Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Mazo } from "src/app/core/models/Mazo";
import { Usuario } from "src/app/core/models/Usuario";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";
import { AuthService } from "src/app/shared/services/authService/auth.service";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";
import { UsuarioService } from "src/app/shared/services/usuarioService/usuario.service";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.css"],
  animations: [fadeInOutAnimation],
})
export class PerfilComponent implements OnInit, OnDestroy {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private authService: AuthService,
    private mazoService: MazoService,
  ) {}
  routeSubscription: Subscription;
  usuarioId: string = null;
  usuario: Usuario = null;
  esPerfilPropio: boolean = null;
  mazosPublicos: Array<Mazo> = [];
  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((param) => {
      this.usuarioId = param.get("usuarioId");
      this.usuarioService.getUsuarioById(this.usuarioId).then((u) => {
        this.usuario = Usuario.map(u);
        this.titleService.setTitle(`${this.usuario.apodo} - VocabMaster`);
        this.esPerfilPropio = this.usuario._id === this.authService.usuario._id;
        this.loadMazosPublicos();
      });
    });
  }

  loadMazosPublicos(): void {
    this.mazoService
      .getAllMazosForUsuario(this.usuarioId)
      .then((mazos) => {
        this.mazosPublicos = Mazo.mapArray(mazos).filter((m) => !m.privado);
      })
      .catch((err) => console.log(err));
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe(); // Importante desuscribirse para evitar pérdida de memoria
  }
}
