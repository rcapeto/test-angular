import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Input() src?: string
  @Input() alt?: string | null
  @Input() big: boolean = false
}
