import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { UsuarioRoutingModule } from "./usuario-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { EditarPerfilComponent } from "./pages/editar-perfil/editar-perfil.component";
import { AuthModule } from "../auth/auth.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [PerfilComponent, EditarPerfilComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
  ],
})
export class UsuarioModule {}
