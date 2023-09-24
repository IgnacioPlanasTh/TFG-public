import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Imagen } from "src/app/core/models/Imagen";
import { Usuario } from "src/app/core/models/Usuario";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";
import { AuthService } from "src/app/shared/services/authService/auth.service";
import { FormService } from "src/app/shared/services/formService/form.service";
import { UsuarioService } from "src/app/shared/services/usuarioService/usuario.service";

@Component({
  selector: "app-editar-perfil",
  templateUrl: "./editar-perfil.component.html",
  styleUrls: ["./editar-perfil.component.css"],
  animations: [fadeInOutAnimation],
})
export class EditarPerfilComponent implements OnInit {
  editForm: FormGroup;
  usuario: Usuario;
  usuarioId: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private formService: FormService,
    private router: Router,
    private titleService: Title,
  ) {
    this.editForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ]),
      apellido: new FormControl("", [Validators.maxLength(50)]),
      apodo: new FormControl("", [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
      ]),
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
    });
  }

  idiomas: any;
  ngOnInit(): void {
    this.titleService.setTitle(`Editar perfil - VocabMaster`);

    this.formService.getIdiomas().subscribe((idiomas) => {
      this.idiomas = idiomas;
    });
    this.route.paramMap.subscribe((param) => {
      this.usuarioId = param.get("usuarioId");
      this.usuarioService.getUsuarioById(this.usuarioId).then((u) => {
        this.usuario = Usuario.map(u);
        this.editForm = new FormGroup({
          nombre: new FormControl(this.usuario.nombre, [
            Validators.required,
            Validators.maxLength(50),
          ]),
          apellido: new FormControl(this.usuario.apellido, [
            Validators.maxLength(50),
          ]),
          apodo: new FormControl(this.usuario.apodo, [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ]),
          contraseña: new FormControl(""),
          contraseña2: new FormControl(""),
          image: new FormControl(null, [
            this.formService.requiredFileType("png"),
          ]),
          idioma: new FormControl(this.usuario.idioma),
        });
      });
    });
  }

  async onSubmit() {
    // Marca los inputs como touched para mostrar los errores onSubmit
    Object.keys(this.editForm.controls).forEach((field) => {
      const control = this.editForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    let updateContraseña: boolean = false;
    if (this.editForm.value.contraseña !== "") {
      updateContraseña = true;
      if (this.editForm.value.contraseña.length < 5) {
        this.editForm.controls["contraseña"].setErrors({
          minlength: "Debe ser de 5 caracterees mínimo",
        });
      }
      if (this.editForm.value.contraseña !== this.editForm.value.contraseña2) {
        this.editForm.controls["contraseña"].setErrors({
          notEqual: "las contraseñas no coinciden",
        });
        this.editForm.controls["contraseña2"].setErrors({
          notEqual: "las contraseñas no coinciden",
        });
      }
    }
    if (this.editForm.valid) {
      var formData: FormData = this.formService.toFormData(this.editForm.value);
      formData.delete("contraseña2");
      if (!this.editForm.value.image) {
        formData.delete("image");
      }
      if (!updateContraseña) {
        formData.delete("contraseña");
      }
      this.usuarioService
        .update(this.usuarioId, formData)
        .then((response) => {
          this.authService.updateData();
          this.router.navigate(["/"]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
