import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SelectIdiomasComponent } from "./components/select-idiomas/select-idiomas.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BanderasComponent } from "./components/banderas/banderas.component";
import { AvatarComponent } from "./components/avatar/avatar.component";
import { MazoCardComponent } from "./components/mazo-card/mazo-card.component";

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    SelectIdiomasComponent,
    BanderasComponent,
    AvatarComponent,
    MazoCardComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    MenuComponent,
    FooterComponent,
    SelectIdiomasComponent,
    BanderasComponent,
    AvatarComponent,
    MazoCardComponent,
  ],
})
export class SharedModule {}
