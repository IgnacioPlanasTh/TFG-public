import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/authService/auth.service";
import { FormService } from "src/app/shared/services/formService/form.service";
import { GoogleService } from "../../services/google.service";
import { Title } from "@angular/platform-browser";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
  animations: [fadeInOutAnimation],
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup;
  errores: any = null;

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private formService: FormService,
    private router: Router,
    private googleService: GoogleService,
  ) {
    this.registerForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      apellido: new FormControl("", [Validators.maxLength(50)]),
      apodo: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      correo: new FormControl("", [Validators.required, Validators.email]),
      contraseña: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      contraseña2: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      image: new FormControl(null, [this.formService.requiredFileType("png")]),
      idioma: new FormControl("es"),
      aceptoCondiciones: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  idiomas: any;
  ngOnInit(): void {
    this.titleService.setTitle("Crea tu cuenta! - VocabMaster");
    this.formService.getIdiomas().subscribe((idiomas) => {
      this.idiomas = idiomas;
    });
  }

  ngAfterViewInit(): void {
    this.googleService.initializeButton();
  }

  async onSubmit() {
    //marca los inputs como touched para mostrar los errores onSubmit
    Object.keys(this.registerForm.controls).forEach((field) => {
      const control = this.registerForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (
      this.registerForm.value.contraseña !== this.registerForm.value.contraseña2
    ) {
      this.registerForm.controls["contraseña"].setErrors({
        notEqual: "las contraseñas no coinciden",
      });
      this.registerForm.controls["contraseña2"].setErrors({
        notEqual: "las contraseñas no coinciden",
      });
    }
    if (this.registerForm.valid) {
      var formData: any = this.formService.toFormData(this.registerForm.value);
      let errors = await this.authService.register(formData);
      console.log(errors);
      if (!errors) {
        this.router.navigate(["/"]);
      } else {
        this.errores = errors.error;
      }
    }
  }
}
