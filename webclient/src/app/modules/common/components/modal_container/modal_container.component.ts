import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ModalDirective } from '@dm/common/directives/modal/modal.directive';
import { ModalService } from '@dm/common/services/modal.service';

import { GenericModalComponent } from '@dm/common/components/generic_modal/generic_modal.component';

@Component({
  selector: 'modal-container',
  templateUrl: './modal_container.component.html'
})
export class ModalContainerComponent {
  @ViewChild(ModalDirective) modal!: ModalDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService
  ) {}

  shouldShowModal(): boolean {
    return this.modalService.componentClass !== undefined;
  }

  ngOnInit(): void {
    if (!this.shouldShowModal()) {
      return;
    }

    let viewContainerRef = this.modal.viewContainerRef;
    viewContainerRef.clear();

    if (!this.modalService.componentClass) {
      return;
    }

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(GenericModalComponent);
    viewContainerRef.createComponent(componentFactory);

    // let componentRef = viewContainerRef.createComponent(componentFactory);
    // (<AdComponent>componentRef.instance).data = adItem.data
  }
}
