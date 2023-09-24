import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { MazosModule } from "./modules/mazos/mazos.module";
import { JugarModule } from "./modules/jugar/jugar.module";
import { InicioModule } from "./modules/inicio/inicio.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsuarioModule } from "./modules/usuario/usuario.module";

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,

    MazosModule,
    JugarModule,
    InicioModule,
    AuthModule,
    UsuarioModule,

    AppRoutingModule,
  ],

  providers: [
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "246511122230-o0s236tsmlb49glnr6ikvgv5nugbg05f.apps.googleusercontent.com",
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
