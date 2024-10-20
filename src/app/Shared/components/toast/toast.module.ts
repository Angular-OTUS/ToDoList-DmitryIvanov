import { OverlayModule } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { defaultToastConfig, TOAST_CONFIG_TOKEN, ToastConfig } from './toast-config';
import { ToastComponent } from './toast.component';

@NgModule({
  imports: [OverlayModule, MatIconModule, MatButtonModule, NgClass],
  declarations: [ToastComponent],
})
export class ToastModule {
  public static forRoot(config: ToastConfig = defaultToastConfig): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        {
          provide: TOAST_CONFIG_TOKEN,
          useValue: { ...defaultToastConfig, ...config },
        },
      ],
    };
  }
}
