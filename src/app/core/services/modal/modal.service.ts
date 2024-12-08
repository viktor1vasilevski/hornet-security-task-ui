import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService<T> {

  private componentRef!: ComponentRef<any>;
  private componentSubscriber!: Subject<any>;

  constructor() {}

  openModal(entry: ViewContainerRef, component: new (...args: any[]) => any, data?: any, enableResponse?: boolean): Observable<any> {
    this.componentRef = entry.createComponent(component);

    if (data && enableResponse) {
      (this.componentRef.instance as any).data = data;
      (this.componentRef.instance as any).closeMeEvent.subscribe(() => this.closeModal());
      (this.componentRef.instance as any).confirmEvent.subscribe((response: any) => this.confirm(response));
    } else if(data && !enableResponse) {
      (this.componentRef.instance as any).data = data;
      (this.componentRef.instance as any).closeMeEvent.subscribe(() => this.closeModal());
    } else {
      (this.componentRef.instance as any).closeMeEvent.subscribe(() => this.closeModal());
      (this.componentRef.instance as any).confirmEvent.subscribe((response: any) => this.confirm(response));
    }

    this.componentSubscriber = new Subject<any>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm(response: any) {
    this.componentSubscriber.next(response);
    this.closeModal();
  }
}

