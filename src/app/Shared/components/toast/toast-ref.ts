import { OverlayRef } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';

export const TOAST_REF: InjectionToken<ToastRef> = new InjectionToken<ToastRef>('toast-ref');

export class ToastRef {
  constructor(private readonly overlay: OverlayRef) {}

  public close(): void {
    this.overlay.dispose();
  }

  public isVisible(): boolean {
    return this.overlay?.overlayElement instanceof HTMLElement;
  }

  public getPosition(): DOMRect {
    return this.overlay.overlayElement.getBoundingClientRect();
  }
}
