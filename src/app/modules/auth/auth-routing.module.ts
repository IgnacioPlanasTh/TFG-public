import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { NoAuthenticatedGuard } from "src/app/core/guards/noAuthenticatedGuard/no-authenticated.guard";
import { CondicionesDeUsoComponent } from "./pages/condiciones-de-uso/condiciones-de-uso.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [NoAuthenticatedGuard],
  },
  {
    path: "crear-cuenta",
    component: RegistroComponent,
    canActivate: [NoAuthenticatedGuard],
  },
  {
    path: "condiciones-de-uso",
    component: CondicionesDeUsoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
