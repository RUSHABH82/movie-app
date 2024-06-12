import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  isToggled: boolean;
  toggleBtnText = 'Expand';

  constructor() {
    this.isToggled = false;
  }

  toggle(): void {
    this.toggleBtnText = this.isToggled ? 'Expand' : 'Collapse';
    this.isToggled = !this.isToggled;
  }
}

enum CollapseExpand {
  Collapse, Expand
}
