import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/authService/auth.service";
import { FormService } from "src/app/shared/services/formService/form.service";
import { GoogleService } from "../../services/google.service";
import { Title } from "@angular/platform-browser";
import { fadeInOutAnimation } from "src/app/shared/animations/animations";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  animations: [fadeInOutAnimation],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formService: FormService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private googleService: GoogleService,
    private titleService: Title,
  ) {}
  loginForm = new FormGroup({
    correo: new FormControl("", [Validators.required, Validators.email]),
    contraseña: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
  ngOnInit(): void {
    this.titleService.setTitle("Iniciar sesión - VocabMaster");
  }

  ngAfterViewInit(): void {
    this.googleService.initializeButton();
  }

  async onSubmit() {
    //marca los inputs como touched para mostrar los errores onSubmit
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (this.loginForm.valid) {
      let ok = await this.authService.login(
        this.formService.toFormData(this.loginForm.value),
      );

      if (ok) {
        this.router.navigate(["/"]);
      } else {
        this.loginForm.setErrors({
          invalidCredentials: "Credenciales inválidas",
        });
      }
    }
  }
}
