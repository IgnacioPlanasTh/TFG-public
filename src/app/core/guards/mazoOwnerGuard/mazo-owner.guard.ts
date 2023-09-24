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
import { Mazo } from "../../models/Mazo";

@Injectable({
  providedIn: "root",
})
export class MazoOwnerGuard implements CanActivate {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}

  // Este guard es usado para verificar que se es el dueño del mazo, para los componentes relacionados con jugar con tu mazo o editarlo
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
        .get<any>(this.apiService.URI + "/mazos/" + mazoId)
        .subscribe((m) => {
          let mazo = new Mazo(m);
          if (mazo.getUsuarioId() === this.authService.usuarioId) {
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
