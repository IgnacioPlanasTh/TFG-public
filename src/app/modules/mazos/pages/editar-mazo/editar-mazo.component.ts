import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Mazo } from "src/app/core/models/Mazo";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";
import { FormService } from "src/app/shared/services/formService/form.service";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";

@Component({
  selector: "app-editar-mazo",
  templateUrl: "./editar-mazo.component.html",
  styleUrls: ["./editar-mazo.component.css"],
  animations: [fadeInOutAnimation],
})
export class EditarMazoComponent implements OnInit {
  constructor(
    private mazoService: MazoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private formService: FormService,
    private titleService: Title,
  ) {}

  mazoId: string = null;
  mazo: Mazo = null;
  editarMazoForm: FormGroup;
  @ViewChildren("nuevoInput", { read: ElementRef })
  nuevosInputs!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.titleService.setTitle(`Editar mazo - VocabMaster`);

    this.route.paramMap.subscribe((param) => {
      this.mazoId = param.get("mazoId");
      this.mazoService.getMazoById(this.mazoId).then((mazo) => {
        this.mazo = new Mazo(mazo);
        this.titleService.setTitle(
          `${this.mazo.nombre} | Editar - VocabMaster`,
        );
        this.editarMazoForm = new FormGroup({
          _id: new FormControl(this.mazo._id),
          nombre: new FormControl(this.mazo.nombre, [
            Validators.required,
            Validators.maxLength(30),
          ]),
          descripcion: new FormControl(
            this.mazo.descripcion,
            Validators.maxLength(100),
          ),
          privado: new FormControl(this.mazo.privado),
          palabras: this.fb.array(
            this.mazo.palabras.map((p) =>
              this.fb.group({
                natal: new FormControl(p.natal, [
                  Validators.required,
                  Validators.maxLength(40),
                ]),
                traduccion: new FormControl(p.traduccion, [
                  Validators.required,
                  Validators.maxLength(40),
                ]),
                _id: new FormControl(p._id),
              }),
            ),
          ),
        });
      });
    });
  }

  get formPalabras(): FormArray {
    return this.editarMazoForm.get("palabras") as FormArray;
  }

  deletePalabra(index: number) {
    this.formPalabras.removeAt(index);
  }

  crearPalabra() {
    this.formPalabras.push(
      new FormGroup({
        natal: new FormControl("", Validators.required),
        traduccion: new FormControl("", Validators.required),
        // _id:new FormControl(),
      }),
    );

    setTimeout(() => {
      const nuevosInputsArray = this.nuevosInputs.toArray();
      const ultimoInput = nuevosInputsArray[nuevosInputsArray.length - 1];
      if (ultimoInput) {
        ultimoInput.nativeElement.focus();
      }
    });
  }

  guardarCambios() {
    console.log(this.editarMazoForm.value);

    var fd = this.formService.toFormData(this.editarMazoForm.value);
    if (this.editarMazoForm.valid) {
      this.mazoService.updateMazo(fd).then((res) => {
        this.router.navigate(["/mazo", this.mazo._id]);
      });
    } else {
      alert("No es valido. Asegurese de que no haya palabras vacías");
    }
  }
  descartarCambios() {
    if (confirm("Desea descartar los cambios?")) {
      this.router.navigate(["/mazo", this.mazo._id]);
    }
  }
}
