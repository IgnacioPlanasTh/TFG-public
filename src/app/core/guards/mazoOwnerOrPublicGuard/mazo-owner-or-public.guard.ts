import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, firstValueFrom } from "rxjs";
import { ApiService } from "src/app/shared/services/apiService/api.service";
import { AuthService } from "src/app/shared/services/authService/auth.service";

@Injectable({
  providedIn: "root",
})
export class MazoOwnerOrPublicGuard implements CanActivate {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}
  // Este guard es usado para verificar que se es el dueño del mazo o es publico, para poder acceder a la vista visualizarMazo
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLogged) {
      const mazoId = next.params.mazoId;
      this.http
        .get(this.apiService.URI + "/mazos/acceso/" + mazoId)
        .subscribe((access) => {
          if (access === true) {
            return true;
          } else {
            return this.router.navigate(["/"]);
          }
        });
    } else {
      return this.router.navigate(["/"]);
    }
  }
}
