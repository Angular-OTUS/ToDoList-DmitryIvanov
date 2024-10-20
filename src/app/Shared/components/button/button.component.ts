import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public disabled?: boolean;
  @Input() public type: ButtonType = 'button';
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter<void>();

  public onClick(event: MouseEvent): void {
    event.stopPropagation();

    this.clickEvent.emit();
  }
}
