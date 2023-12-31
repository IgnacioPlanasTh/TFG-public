import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { InicioRoutingModule } from "./inicio-routing.module";
import { InicioComponent } from "./pages/inicio.component";
// import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InicioComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    // SharedModule
  ],
})
export class InicioModule {}
