import { Injectable, Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  componentClass?: typeof Component;

  componentClassObservable: Observable<typeof Component>;

  show(componentClass: typeof Component): void {
    this.componentClass = componentClass;
  }

  close(): void {
    this.componentClass = undefined;
  }
}
