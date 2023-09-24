import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FlashCardsComponent } from "./pages/flash-cards/flash-cards.component";
import { SelectGamemodeComponent } from "./pages/select-gamemode/select-gamemode.component";
import { ResultadoComponent } from "./pages/resultado/resultado.component";
import { MazoOwnerGuard } from "src/app/core/guards/mazoOwnerGuard/mazo-owner.guard";
import { AuthenticatedGuard } from "src/app/core/guards/authenticatedGuard/authenticated.guard";
import { ParejasComponent } from "./pages/parejas/parejas.component";

const routes: Routes = [
  {
    path: "jugar/:mazoId",
    component: SelectGamemodeComponent,
    canActivate: [AuthenticatedGuard, MazoOwnerGuard],
  },

  {
    path: "jugar/:mazoId/flashcards",
    component: FlashCardsComponent,
    canActivate: [AuthenticatedGuard, MazoOwnerGuard],
  },

  {
    path: "jugar/:mazoId/parejas",
    component: ParejasComponent,
    canActivate: [AuthenticatedGuard, MazoOwnerGuard],
  },

  {
    path: "jugar/:mazoId/finalizar",
    component: ResultadoComponent,
    canActivate: [AuthenticatedGuard, MazoOwnerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JugarRoutingModule {}
