import { Component, Input, OnInit } from "@angular/core";
import { Imagen } from "src/app/core/models/Imagen";
import { ImageService } from "../../services/imageService/image.service";

@Component({
  selector: "app-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.css"],
})
export class AvatarComponent implements OnInit {
  constructor(public imageService: ImageService) {}

  get src() {
    if (this.image) return this.imageService.renderImage(this.image);
    else return "../../../../assets/images/default_user_avatar.png";
  }
  @Input() image: Imagen;
  @Input() width: string;

  ngOnInit(): void {}

  myStyle() {
    if (this.width == null)
      return {
        width: "32px",
        "max-height": "32px",
        "border-radius": "50%",
      };
    let style = {
      width: this.width,
      "max-height": this.width,
      "border-radius": "50%",
    };
    return style;
  }
}
