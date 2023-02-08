import { Component, Input, OnChanges } from '@angular/core';

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
    let strength = 10;
    if (this.password.length >= 8) {
      strength += 30;
    }
    if (this.password.match(/[a-z]+/) && this.password.match(/[A-Z]+/)) {
      strength += 30;
    }
    if (this.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) {
      strength += 30;
    }
    this.strength = strength;
  }

  ngOnChanges() {
    this.calculateStrength();
  }
}
