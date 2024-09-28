import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appTaskName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TaskNameDirective, multi: true }],
})
export class TaskNameDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const taskName = typeof control.value === 'string' ? control.value.trim() : '';
    return taskName.length > 0 ? null : { taskName: true };
  }
}
