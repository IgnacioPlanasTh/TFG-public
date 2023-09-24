import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent,
} from "@angular/common/http";
import { Observable, catchError, of, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/authService/auth.service";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem("id_token");
          localStorage.removeItem("expires_at");
          localStorage.removeItem("usuarioId");
          this.router.navigateByUrl("/login");
          alert(
            "Vaya! Parece que su sesión ha expirado. Vuelva a iniciar sesión",
          );
        }
        return throwError(error);
      }),
    );
  }
}
