import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Idioma } from "src/app/core/models/Idioma";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";
import { AuthService } from "src/app/shared/services/authService/auth.service";
import { FormService } from "src/app/shared/services/formService/form.service";
import { MazoService } from "src/app/shared/services/mazoService/mazo.service";

@Component({
  selector: "app-crear-mazo",
  templateUrl: "./crear-mazo.component.html",
  styleUrls: ["./crear-mazo.component.css"],
  animations: [fadeInOutAnimation],
})
export class CrearMazoComponent implements OnInit {
  crearMazoForm: FormGroup;
  idiomas: Array<Idioma> = [];

  constructor(
    private formService: FormService,
    private mazoSerivce: MazoService,
    public authService: AuthService,
    private router: Router,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Crea tu mazo - VocabMaster");

    this.formService.getIdiomas().subscribe((i) => (this.idiomas = i));
    this.crearMazoForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.maxLength(30),
      ]),
      descripcion: new FormControl("", [Validators.maxLength(100)]),
      idioma1: new FormControl("es", Validators.required),
      idioma2: new FormControl("en", Validators.required),
      privado: new FormControl(false),
      usuarioId: new FormControl(null, Validators.required),
    });
    this.authService
      .getUsuarioAutenticado()
      .then((usuario) => {
        this.crearMazoForm.controls.idioma1.setValue(usuario.idioma);
        this.crearMazoForm.controls.usuarioId.setValue(usuario._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async onSubmit() {
    //marca los inputs como touched para mostrar los errores onSubmit
    Object.keys(this.crearMazoForm.controls).forEach((field) => {
      const control = this.crearMazoForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.crearMazoForm.value.idioma1 === this.crearMazoForm.value.idioma2) {
      this.crearMazoForm.controls["idioma1"].setErrors({
        equal: "Los idiomas no pueden coincidir",
      });
      this.crearMazoForm.controls["idioma2"].setErrors({
        equal: "Los idiomas no pueden coincidir",
      });
    }

    if (this.crearMazoForm.valid) {
      try {
        var mazoId = await this.mazoSerivce.crearMazo(
          this.formService.toFormData(this.crearMazoForm.value),
        );
        this.router.navigate(["/mazo/" + mazoId]);
      } catch (err) {}
    } else {
      console.log("mazo incorrecto");
      console.log(this.crearMazoForm);
    }
  }
}
