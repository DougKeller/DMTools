import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IncrementalInputComponent } from '@dm/common/components/incremental_input/incremental_input.component';

@NgModule({
  declarations: [
    IncrementalInputComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    IncrementalInputComponent
  ]
})
export class DmCommonModule { }
