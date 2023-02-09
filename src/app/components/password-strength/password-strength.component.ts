import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() password!: string;
  strength: number = 0;

  constructor() {}

  calculateStrength() {
    let strength = 0;
    if (this.password.length >= 4) {
      strength += 25;
    }
    if (this.password.match(/\d+/)) {
      strength += 25;
    }
    if (this.password.match(/[a-z]+/) && this.password.match(/[A-Z]+/)) {
      strength += 25;
    }
    if (this.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) {
      strength += 25;
    }
    this.strength = strength;
  }

  ngOnChanges() {
    this.calculateStrength();
  }
}
