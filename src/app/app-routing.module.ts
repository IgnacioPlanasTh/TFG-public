import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/auth/pages/login/login.component";
import { RegistroComponent } from "./modules/auth/pages/registro/registro.component";
import { InicioComponent } from "./modules/inicio/pages/inicio.component";
import { PerfilComponent } from "./modules/usuario/pages/perfil/perfil.component";

const routes: Routes = [
  //TODO: router-outlet (Padre)
  {
    path: "",
    redirectTo: "/inicio",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
