import { NgModule, forwardRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { UnauthorizedInterceptor } from "./interceptors/unauthorized.interceptor";
import { AuthInterceptor } from "./interceptors/auth.interceptor";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: forwardRef(() => AuthInterceptor),
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: forwardRef(() => UnauthorizedInterceptor),
      multi: true,
    },
  ],
})
export class CoreModule {}
