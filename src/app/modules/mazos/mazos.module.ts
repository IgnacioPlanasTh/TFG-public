import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MazosRoutingModule } from "./mazos-routing.module";
import { CrearMazoComponent } from "./pages/crear-mazo/crear-mazo.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { VisualizarMazoComponent } from "./pages/visualizar-mazo/visualizar-mazo.component";
import { RouterModule } from "@angular/router";
import { EditarMazoComponent } from "./pages/editar-mazo/editar-mazo.component";
import { BibliotecaComponent } from "./pages/biblioteca/biblioteca.component";
import { EstadisticasMazoComponent } from "./pages/estadisticas-mazo/estadisticas-mazo.component";
import { BusquedaComponent } from "./pages/busqueda/busqueda.component";

@NgModule({
  declarations: [
    CrearMazoComponent,
    VisualizarMazoComponent,
    EditarMazoComponent,
    BibliotecaComponent,
    EstadisticasMazoComponent,
    BusquedaComponent,
  ],
  imports: [
    CommonModule,
    MazosRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class MazosModule {}
