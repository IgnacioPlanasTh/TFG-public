import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { AuthService } from "src/app/shared/services/authService/auth.service";
import { SharedModule } from "src/app/shared/shared.module";
import { CondicionesDeUsoComponent } from "./pages/condiciones-de-uso/condiciones-de-uso.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    FileUploadComponent,
    CondicionesDeUsoComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
  exports: [FileUploadComponent],

  providers: [AuthService],
})
export class AuthModule {}
