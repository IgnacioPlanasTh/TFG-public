import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BibliotecaComponent } from "./pages/biblioteca/biblioteca.component";
import { CrearMazoComponent } from "./pages/crear-mazo/crear-mazo.component";
import { EditarMazoComponent } from "./pages/editar-mazo/editar-mazo.component";
import { VisualizarMazoComponent } from "./pages/visualizar-mazo/visualizar-mazo.component";
import { EstadisticasMazoComponent } from "./pages/estadisticas-mazo/estadisticas-mazo.component";
import { UsuarioAccessGuard } from "src/app/core/guards/usuarioAccessGuard/usuario-access.guard";
import { AuthenticatedGuard } from "src/app/core/guards/authenticatedGuard/authenticated.guard";
import { MazoOwnerGuard } from "src/app/core/guards/mazoOwnerGuard/mazo-owner.guard";
import { BusquedaComponent } from "./pages/busqueda/busqueda.component";
import { MazoOwnerOrPublicGuard } from "src/app/core/guards/mazoOwnerOrPublicGuard/mazo-owner-or-public.guard";

// TODO: Añadir guards de acceso a un mazo público
const routes: Routes = [
  {
    path: "mazo",
    redirectTo: "mazo/crear",
  },
  {
    path: "mazo/crear",
    component: CrearMazoComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: "mazo/:mazoId",
    component: VisualizarMazoComponent,
    canActivate: [AuthenticatedGuard, MazoOwnerOrPublicGuard],
  },
  {
    path: "mazo/:mazoId/editar",
    component: EditarMazoComponent,
    canActivate: [AuthenticatedGuard, MazoOwnerGuard],
  },
  {
    path: "mazo/:mazoId/estadisticas",
    component: EstadisticasMazoComponent,
    canActivate: [AuthenticatedGuard, MazoOwnerGuard],
  },
  {
    path: "mazos/usuario/:usuarioId",
    component: BibliotecaComponent,
    canActivate: [AuthenticatedGuard, UsuarioAccessGuard],
  },
  {
    path: "busqueda",
    component: BusquedaComponent,
    canActivate: [AuthenticatedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MazosRoutingModule {}
