import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Mazo } from "src/app/core/models/Mazo";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";
import { AuthService } from "src/app/shared/services/authService/auth.service";
import { FormService } from "src/app/shared/services/formService/form.service";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";

@Component({
  selector: "app-visualizar-mazo",
  templateUrl: "./visualizar-mazo.component.html",
  styleUrls: ["./visualizar-mazo.component.css"],
  animations: [fadeInOutAnimation],
})
export class VisualizarMazoComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private mazoService: MazoService,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService,
    private titleService: Title,
  ) {}
  mazoId: string = null;
  mazo: Mazo = null;
  isOwner: boolean = false;
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.mazoId = param.get("mazoId");
      this.mazoService.getMazoById(this.mazoId).then((mazo) => {
        this.mazo = new Mazo(mazo);
        this.titleService.setTitle(`${this.mazo.nombre} - VocabMaster`);
        if (this.authService.usuarioId === this.mazo.usuario._id) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }
      });
    });
  }

  exportarAJSON() {
    let copiaMazo = new Mazo(this.mazo);
    delete copiaMazo.usuario;
    delete copiaMazo.fechaCreacion;
    delete copiaMazo._id;
    delete copiaMazo.archivado;
    delete copiaMazo.favorito;
    for (let palabra of copiaMazo.palabras) {
      delete palabra._id;
    }
    let datosJSON = JSON.stringify(copiaMazo);
    var enlaceDescarga = document.createElement("a");
    enlaceDescarga.href =
      "data:application/json;charset=utf-8," + encodeURIComponent(datosJSON);
    let nombreArchivo = copiaMazo.nombre.replace(/[^\w\s.-]/gi, "_");
    nombreArchivo = nombreArchivo.replace(/\s+/g, "_");
    nombreArchivo = nombreArchivo.replace(/\.+/g, "_");
    enlaceDescarga.download = nombreArchivo + ".json";
    enlaceDescarga.click();
  }
  copiarMazo() {
    if (!confirm("Estas seguro que quieres copiar este mazo?")) {
      return;
    }
    let fd = this.formService.toFormData(this.mazo);
    fd.delete("_id");
    fd.delete("archivado");
    fd.delete("favorito");
    fd.delete("usuario");
    fd.delete("fechaCreacion");
    fd.set("usuarioId", this.authService.usuarioId);
    this.mazoService.importarMazo(fd).then((mazo) => {
      this.router.navigateByUrl("/mazo/" + mazo._id);
    });
  }
  goToPerfil() {
    this.router.navigateByUrl("/usuario/" + this.mazo.usuario._id);
  }

  borrarMazo() {
    if (
      confirm(
        "Seguro que quiere borrar el mazo? Esta acción no se puede deshacer",
      )
    ) {
      this.mazoService
        .borrarMazo(this.mazo._id)
        .then((ok) => {
          this.router.navigateByUrl(
            "/mazos/usuario/" + this.authService.usuarioId,
          );
        })
        .catch((err) => console.log(err));
    }
  }
}
