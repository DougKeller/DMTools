import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GenericModalComponent } from '@dm/common/components/generic_modal/generic_modal.component';
import { IncrementalInputComponent } from '@dm/common/components/incremental_input/incremental_input.component';
import { ModalContainerComponent } from '@dm/common/components/modal_container/modal_container.component';

@NgModule({
  declarations: [
    GenericModalComponent,
    IncrementalInputComponent,
    ModalContainerComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    GenericModalComponent,
    IncrementalInputComponent,
    ModalContainerComponent
  ]
})
export class DmCommonModule { }
