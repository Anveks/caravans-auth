import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: 'app-load-spinner',
  template: '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  styleUrls: ["./spinner.component.css"]
}) export class LoadingSpinnerComponent {}
