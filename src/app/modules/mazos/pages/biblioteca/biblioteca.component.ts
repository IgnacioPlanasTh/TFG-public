import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Mazo } from "src/app/core/models/Mazo";
import { AuthService } from "src/app/shared/services/authService/auth.service";
import { FormService } from "src/app/shared/services/formService/form.service";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";
import JSONFormatter from "json-formatter-js";
import { Title } from "@angular/platform-browser";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";

@Component({
  selector: "app-biblioteca",
  templateUrl: "./biblioteca.component.html",
  styleUrls: ["./biblioteca.component.css"],
  animations: [fadeInOutAnimation],
})
export class BibliotecaComponent implements OnInit {
  constructor(
    private mazoService: MazoService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formService: FormService,
    private titleService: Title,
  ) {}

  usuarioId: string = null;
  mazos: Array<Mazo> = [];
  mazosRenderizados: Array<Mazo> = [];
  bibliotecaTtitle: string = "Mi biblioteca";
  isShowingDefault: boolean = null;

  ngOnInit(): void {
    this.titleService.setTitle("Mibiblioteca de mazos - VocabMaster");
    this.route.paramMap.subscribe((param) => {
      this.usuarioId = param.get("usuarioId");
      this.mazoService.getAllMazosForUsuario(this.usuarioId).then((mazos) => {
        this.mazos = Mazo.mapArray(mazos);
        this.showDefault();
      });
    });
  }

  showDefault() {
    this.mazosRenderizados = this.mazos.filter((m) => !m.archivado);
    this.mazosRenderizados.sort(
      (a, b) => (b.favorito ? 1 : 0) - (a.favorito ? 1 : 0),
    );
    this.isShowingDefault = true;
    this.bibliotecaTtitle = "Mi biblioteca";
  }

  showArchivados() {
    this.mazosRenderizados = this.mazos
      .filter((m) => m.archivado)
      .sort((a, b) => (b.favorito ? 1 : 0) - (a.favorito ? 1 : 0));
    this.isShowingDefault = false;
    this.bibliotecaTtitle = "Archivados";
  }

  actualizarGaleria(mazoActualizado: any) {
    const indiceMazo = this.mazos.findIndex(
      (mazo) => mazo._id === mazoActualizado._id,
    );
    if (indiceMazo !== -1) {
      this.mazos[indiceMazo] = mazoActualizado;
    }
    if (this.isShowingDefault) this.showDefault();
    else this.showArchivados();
  }

  eliminarMazo(mazoId: any) {
    this.mazos = this.mazos.filter((m) => m._id !== mazoId);
    if (this.isShowingDefault) this.showDefault();
    else this.showArchivados();
  }

  @ViewChild("archivoInput", { static: false }) archivoInput: ElementRef;

  archivo: File;
  contenidoArchivo: string;

  abrirInputArchivo() {
    this.archivoInput.nativeElement.click();
  }

  showOverlay: boolean = false;
  importarJSONCorrecto: boolean = false;
  errores: Array<any> = [];
  mazoImportadoId: string;

  async importarArchivo(event: any) {
    this.archivo = event.target.files[0];
    if (this.archivo) {
      const lector = new FileReader();
      lector.onload = (evento: any) => {
        try {
          this.contenidoArchivo = evento.target.result;
          let archivoJSON = JSON.parse(this.contenidoArchivo);
          archivoJSON.usuarioId = this.authService.usuario._id;

          // Convertir JSON a formData
          let formData: FormData = this.formService.toFormData(archivoJSON);
          this.mazoService
            .importarMazo(formData)
            .then((mazo) => {
              this.showOverlay = true;
              this.importarJSONCorrecto = true;
              this.mazos.push(new Mazo(mazo));
              this.showDefault();
              this.waitForOverlayRendered().then(() => {
                this.mazoImportadoId = mazo._id;
                delete mazo.__v;
                delete mazo._id;
                delete mazo.usuario;
                for (let palabra of mazo.palabras) delete palabra._id;
                const formatter = new JSONFormatter(mazo, 1);
                document.getElementById("json").appendChild(formatter.render());
              });
            })
            .catch((err) => {
              console.log(err);
              this.showOverlay = true;
              this.errores = err.error;
            });
        } catch (err) {
          console.log(err);
        }
      };
      lector.readAsText(this.archivo);
    }
  }

  waitForOverlayRendered(): Promise<void> {
    return new Promise<void>((resolve) => {
      const observer = new MutationObserver((mutationsList, observer) => {
        const overlayElement = document.querySelector(".overlay");
        if (overlayElement) {
          observer.disconnect();
          resolve();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
  }

  closeOverlay() {
    this.showOverlay = false;
    this.errores = [];
    this.mazoImportadoId = null;
  }

  doNothing() {}

  irAMazoImportado() {
    if (this.mazoImportadoId) {
      this.router.navigateByUrl("/mazo/" + this.mazoImportadoId);
    }
  }
}
