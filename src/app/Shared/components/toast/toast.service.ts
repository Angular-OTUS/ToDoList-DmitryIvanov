import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector } from '@angular/core';

import { TOAST_CONFIG_TOKEN, TOAST_DATA, ToastConfig, ToastData } from './toast-config';
import { TOAST_REF, ToastRef } from './toast-ref';
import { ToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private lastToast?: ToastRef;

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig
  ) {}

  public showToast(data: ToastData): ToastRef {
    const positionStrategy: GlobalPositionStrategy = this.getPositionStrategy();
    const overlayRef: OverlayRef = this.overlay.create({ positionStrategy });

    const toastRef: ToastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;

    const injector: Injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal: ComponentPortal<ToastComponent> = new ComponentPortal(ToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  private getPositionStrategy(): GlobalPositionStrategy {
    return this.overlay
      .position()
      .global()
      .top(this.getPosition())
      .right(String(this.toastConfig?.position?.right ?? '0') + 'px');
  }

  private getPosition(): string {
    const position: number =
      this.lastToast && this.lastToast.isVisible()
        ? this.lastToast.getPosition().bottom
        : (this.toastConfig?.position?.top ?? 0);
    return String(position) + 'px';
  }

  private getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector): Injector {
    return Injector.create({
      parent: parentInjector,
      providers: [
        { provide: TOAST_DATA, useValue: data },
        { provide: TOAST_REF, useValue: toastRef },
      ],
    });
  }
}
