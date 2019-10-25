import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Renderer2
} from "@angular/core";

import { Data } from "./data";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild("panehScroll", { static: false }) panehScroll: ElementRef;
  @ViewChild("panevScroll", { static: false }) panevScroll: ElementRef;

  constructor(private renderer: Renderer2) {}

  data: any[];

  grid: any = {
    columnDefs: [
      {
        name: "guid",
        type: "string",
        width: ""
      },
      {
        name: "isActive",
        type: "boolean"
      },
      {
        name: "balance",
        type: "string"
      },
      {
        name: "phone",
        type: "string"
      },
      {
        name: "age",
        type: "number"
      },
      {
        name: "email",
        type: "string"
      }
    ]
  };

  ngOnInit() {
    this.data = new Data().data;
  }

  onScroll(w) {
    const x: string =
      document.querySelector(".pane-hScroll").clientWidth +
      document.querySelector(".pane-hScroll").scrollLeft +
      "px";
    this.renderer.setStyle(this.panevScroll.nativeElement, "width", x);
  }
}
