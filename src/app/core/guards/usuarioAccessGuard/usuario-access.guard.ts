import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/shared/services/authService/auth.service";

@Injectable({
  providedIn: "root",
})
export class UsuarioAccessGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLogged) {
      const usuarioId = next.params.usuarioId;
      if (this.authService.usuarioId === usuarioId) return true;
      else return this.router.parseUrl("/inicio");
    } else {
      return this.router.navigateByUrl("/login", { replaceUrl: true });
    }
  }
}
