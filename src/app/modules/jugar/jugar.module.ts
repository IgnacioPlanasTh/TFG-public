import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { JugarRoutingModule } from "./jugar-routing.module";
import { FlashCardsComponent } from "./pages/flash-cards/flash-cards.component";
import { SelectGamemodeComponent } from "./pages/select-gamemode/select-gamemode.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ResultadoComponent } from "./pages/resultado/resultado.component";
import { ParejasComponent } from "./pages/parejas/parejas.component";

@NgModule({
  declarations: [
    FlashCardsComponent,
    SelectGamemodeComponent,
    ResultadoComponent,
    ParejasComponent,
  ],
  imports: [CommonModule, JugarRoutingModule, SharedModule],
})
export class JugarModule {}
