import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Idioma } from "src/app/core/models/Idioma";
import { Mazo } from "src/app/core/models/Mazo";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";
import { FormService } from "src/app/shared/services/formService/form.service";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styleUrls: ["./busqueda.component.css"],
  animations: [fadeInOutAnimation],
})
export class BusquedaComponent implements OnInit {
  q: string;
  mazos: Array<Mazo> = null;

  idiomasDisponibles: Idioma[];
  idiomasNativosSeleccionados: string[] = [];
  idiomasTraduccionSeleccionados: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private mazoService: MazoService,
    private titleService: Title,
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Resultados de la búsqueda - VocabMaster");
    this.formService.getIdiomas().subscribe((idiomas) => {
      this.idiomasDisponibles = idiomas;
    });

    this.route.queryParams.subscribe((params) => {
      this.q = params["q"];
      if (this.q !== undefined) {
        this.mazoService
          .buscarMazos(this.q, [], [])
          .then((mazos) => {
            this.mazos = Mazo.mapArray(mazos);
          })
          .catch((err) => {
            console.log(err);
            alert("Error en la búsqueda");
          });
      } else {
        this.mazos = null;
      }
    });
  }

  toggleIdiomaNativo(idioma: string) {
    if (this.idiomasNativosSeleccionados.includes(idioma)) {
      this.idiomasNativosSeleccionados =
        this.idiomasNativosSeleccionados.filter((lang) => lang !== idioma);
    } else {
      this.idiomasNativosSeleccionados.push(idioma);
    }
  }

  toggleIdiomaTraduccion(idioma: string) {
    if (this.idiomasTraduccionSeleccionados.includes(idioma)) {
      this.idiomasTraduccionSeleccionados =
        this.idiomasTraduccionSeleccionados.filter((lang) => lang !== idioma);
    } else {
      this.idiomasTraduccionSeleccionados.push(idioma);
    }
  }

  showFiltroIdiomaNatal: boolean = false;
  showFiltroIdiomaTraduccion: boolean = false;

  abrirIdiomaNatal() {
    this.showFiltroIdiomaNatal = true;
  }

  abrirIdiomaTraduccion() {
    this.showFiltroIdiomaTraduccion = true;
  }

  closeOverlay() {
    this.showFiltroIdiomaNatal = false;
    this.showFiltroIdiomaTraduccion = false;
  }

  doNothing() {}

  limpiarFiltros() {
    this.idiomasNativosSeleccionados = [];
    this.idiomasTraduccionSeleccionados = [];
  }

  aplicarFiltros() {
    this.showFiltroIdiomaNatal = false;
    this.showFiltroIdiomaTraduccion = false;
    this.mazoService
      .buscarMazos(
        this.q,
        this.idiomasNativosSeleccionados,
        this.idiomasTraduccionSeleccionados,
      )
      .then((mazos) => {
        this.mazos = Mazo.mapArray(mazos);
      })
      .catch((err) => {
        console.log(err);
        alert("Error en la búsqueda");
      });
  }
}
