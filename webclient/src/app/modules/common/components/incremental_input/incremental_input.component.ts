import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dm-incremental-input',
  templateUrl: './incremental_input.component.html'
})
export class IncrementalInputComponent {
  @Input() max?: number;
  @Input() min?: number;
  @Input() disabled?: boolean;

  numberValue?: number;

  @Output() numberChange = new EventEmitter<number>();

  @Input()
  get number(): number {
    if (!this.numberValue) {
      return 0;
    }

    return this.numberValue;
  }

  set number(value: number) {
    this.numberValue = value;

    if (value && this.max) {
      this.numberValue = Math.min(this.numberValue, this.max);
    }

    if (value && this.min) {
      this.numberValue = Math.max(this.numberValue, this.min);
    }

    this.numberChange.emit(this.numberValue);
  }
}
