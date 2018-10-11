import { Component, Input } from '@angular/core';
import { Encounter } from '@dm/common/models/encounter';

@Component({
  selector: 'enemies',
  templateUrl: './enemies.component.html'
})
export class EnemiesComponent {
  @Input() encounter: Encounter;

}
