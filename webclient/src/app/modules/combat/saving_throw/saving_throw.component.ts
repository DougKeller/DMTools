import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';

@Component({
  selector: 'saving-throw',
  templateUrl: './saving_throw.component.html'
})
export class SavingThrowComponent {
  @Input() encounter?: Encounter;
}
