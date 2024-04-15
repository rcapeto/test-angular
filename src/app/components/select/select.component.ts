import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SelectOption } from './select.component.types'

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent<Type = string> implements OnInit {
  @Input() options: SelectOption<Type>[] = []
  @Input() label!: string
  @Input() defaultSelect?: string | null
  @Output() onSelectItem = new EventEmitter<SelectOption<Type>>()

  active = false
  select?: SelectOption<Type>

  constructor() { }

  ngOnInit() {
    this.select = this.options.find(
      item => item.value === this.defaultSelect
    )
  }

  toggleActiveSelect() {
    this.active = !this.active
  }

  onSelectOption(option: SelectOption<Type>) {
    this.onSelectItem.emit(option)
    this.select = option
    this.toggleActiveSelect()
  }
}
