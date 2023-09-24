import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/authService/auth.service";

declare const google: any;

@Injectable({
  providedIn: "root",
})
export class GoogleService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
  ) {}
  initialized: boolean = false;

  initialize() {
    if (
      typeof google !== "undefined" &&
      google.accounts &&
      google.accounts.id
    ) {
      google.accounts.id.initialize({
        client_id:
          "246511122230-o0s236tsmlb49glnr6ikvgv5nugbg05f.apps.googleusercontent.com",
        callback: this.handleGoogleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      google.accounts.id.prompt();
      this.initialized = true;
    }
  }
  initializeButton() {
    if (!this.initialized) {
      this.initialize();
    }
    if (
      typeof google !== "undefined" &&
      google.accounts &&
      google.accounts.id
    ) {
      google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large", width: "100%" },
      );
    }
  }

  async handleGoogleCredentialResponse(response: any) {
    await this.authService.googleLogin(response.credential);
    if (this.authService.isLogged) {
      this.ngZone.run(() => {
        this.router.navigate(["/"]);
      });
    }
  }
}
