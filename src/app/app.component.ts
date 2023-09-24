import { Component, OnInit } from "@angular/core";
import { GoogleService } from "./modules/auth/services/google.service";
import { AuthService } from "./shared/services/authService/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private googleService: GoogleService,
    private authService: AuthService,
  ) {}
  ngOnInit(): void {
    if (!this.authService.isLogged) {
      this.googleService.initialize();
    }
  }
}
