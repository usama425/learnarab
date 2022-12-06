import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  template: `<div class="progressbarBaseBack {{progressBarClasess}}"> <div class="progressbarBaseFront {{childElementClasses}} {{addFullProgressClass}}" [ngStyle]="widthStyle"></div></div>`,
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() frontBarClasses: number[];
  @Input() backBarClasses: number[];
  @Input() class: string;

  _barValue: number;

  @Input()
  set barValue(value: number) {
    this._barValue = value;

    if (value) {
      if (value > 100) {
        this.progressValue = 100;
      } else {
        this.progressValue = value;
      }
    }
    this.updateProgressBar();
  }

  get barValue(): number {
    return this._barValue;
  }

  progressValue: number = 0;

  elementClasses: string;
  childElementClasses: string;
  widthStyle: object = {};

  constructor() { }

  updateProgressBar() {
    this.widthStyle = { width: this.progressValue.toString() + '%' };

    if (this.frontBarClasses.length > 0) {
      var frontPreviousValue = -1;
      this.frontBarClasses.forEach((obj) => {
        if (this.progressValue <= obj && this.progressValue > frontPreviousValue) {
          this.childElementClasses = 'frontBar' + obj.toString();
          frontPreviousValue = obj;
        }
      });
    }

    if (this.backBarClasses.length > 0) {
      var backPreviousValue = -1;
      this.backBarClasses.forEach((obj) => {
        if (this.progressValue <= obj && this.progressValue > backPreviousValue) {
          this.elementClasses = 'backBar' + obj.toString();
          backPreviousValue = obj;
        }
      });
    }
  }

  get progressBarClasess() {
    return `${this.elementClasses} ${this.class}`;
  }

  get addFullProgressClass() {
    return this.progressValue == 100 ? 'full' : '';
  }

}
