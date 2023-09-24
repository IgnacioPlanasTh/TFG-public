import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Mazo } from "src/app/core/models/Mazo";
import { MazoService } from "../../services/mazoService/mazo.service";
import { FormService } from "../../services/formService/form.service";

@Component({
  selector: "app-mazo-card",
  templateUrl: "./mazo-card.component.html",
  styleUrls: ["./mazo-card.component.css"],
})
export class MazoCardComponent implements OnInit {
  @Input() mazo: Mazo;
  @Input() showFav: Boolean = false;
  @Input() showOptions: Boolean = false;
  @Output() mazoActualizado = new EventEmitter();
  @Output() mazoEliminado = new EventEmitter();
  showAvatar: boolean = false;
  constructor(
    private router: Router,
    private mazoService: MazoService,
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    if (typeof this.mazo.usuario === "object") {
      this.showAvatar = true;
    }
  }

  goToMazo() {
    this.router.navigateByUrl("/mazo/" + this.mazo._id);
  }
  goToPerfil() {
    this.router.navigateByUrl("/usuario/" + this.mazo.usuario._id);
  }

  marcarComoFavorito() {
    let mazoCopia = new Mazo(this.mazo);
    mazoCopia.favorito = true;
    let fd = this.formService.toFormData(mazoCopia);
    this.mazoService
      .updateMazo(fd)
      .then((m) => {
        this.mazo = new Mazo(m);
        this.emitirMazo();
      })
      .catch((err) => console.log(err));
  }
  marcarComoNoFavorito() {
    let mazoCopia = new Mazo(this.mazo);
    mazoCopia.favorito = false;
    let fd = this.formService.toFormData(mazoCopia);
    this.mazoService
      .updateMazo(fd)
      .then((m) => {
        this.mazo = new Mazo(m);
        this.emitirMazo();
      })
      .catch((err) => console.log(err));
  }
  archivar() {
    let mazoCopia = new Mazo(this.mazo);
    mazoCopia.archivado = true;
    let fd = this.formService.toFormData(mazoCopia);
    this.mazoService
      .updateMazo(fd)
      .then((m) => {
        this.mazo = new Mazo(m);
        this.emitirMazo();
      })
      .catch((err) => console.log(err));
  }
  desarchivar() {
    let mazoCopia = new Mazo(this.mazo);
    mazoCopia.archivado = false;
    let fd = this.formService.toFormData(mazoCopia);
    this.mazoService
      .updateMazo(fd)
      .then((m) => {
        this.mazo = new Mazo(m);
        this.emitirMazo();
      })
      .catch((err) => console.log(err));
  }

  emitirMazo() {
    this.mazoActualizado.emit(this.mazo);
  }

  borrar() {
    if (
      confirm(
        "Seguro que quiere borrar el mazo? Esta acción no se puede deshacer",
      )
    ) {
      this.mazoService
        .borrarMazo(this.mazo._id)
        .then((ok) => {
          this.mazoEliminado.emit(this.mazo._id);
        })
        .catch((err) => console.log(err));
    }
  }
}
