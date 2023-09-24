import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditarPerfilComponent } from "./pages/editar-perfil/editar-perfil.component";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { AuthenticatedGuard } from "src/app/core/guards/authenticatedGuard/authenticated.guard";
import { UsuarioAccessGuard } from "src/app/core/guards/usuarioAccessGuard/usuario-access.guard";

const routes: Routes = [
  {
    path: "usuario/:usuarioId",
    component: PerfilComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: "usuario/:usuarioId/editar",
    component: EditarPerfilComponent,
    canActivate: [AuthenticatedGuard, UsuarioAccessGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
