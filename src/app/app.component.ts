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

  grid: Grid = {
    columnDefs: [
      {
        label: "test"
      }
    ]
  };

  ngOnInit() {
    this.data = new Data().data;

    const gridd: Grid = JSON.parse(JSON.stringify(this.grid));

    for (let i = 0; i < Object.keys(this.data[0]).length; i++) {
      if (gridd.columnDefs[i] && gridd.columnDefs[i].label) {
        // User specified some
        const x: ColumnDefinition = {
          colType: typeof this.data[0][Object.keys(this.data[0])[i]],
          width: "",
          name: Object.keys(this.data[0])[i],
          label: gridd.columnDefs[i].label
        };
        gridd.columnDefs.push(x);
      } else {
        // User not specified some
        const x: ColumnDefinition = {
          colType: typeof this.data[0][Object.keys(this.data[0])[i]],
          width: "",
          name: Object.keys(this.data[0])[i],
          label: Object.keys(this.data[0])[i]
        };
        gridd.columnDefs.push(x);
      }
    }

    this.grid = JSON.parse(JSON.stringify(gridd));

  }

  onScroll(w) {
    const x: string =
      document.querySelector(".pane-hScroll").clientWidth +
      document.querySelector(".pane-hScroll").scrollLeft +
      "px";
    this.renderer.setStyle(this.panevScroll.nativeElement, "width", x);
  }
}

interface Grid {
  columnDefs: ColumnDefinition[];
}

interface ColumnDefinition {
  label: string;
  name?: string;
  width?: string;
  colType?: string;
}
