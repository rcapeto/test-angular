import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnInit {
  @Input() placeholder?: string 
  @Input() disabled?: boolean = false
  @Input() defaultValue?: string 
  @Input() big?: boolean = false 
  @Output() onChangeInputValue = new EventEmitter()
  @Output() onPressEnterKey = new EventEmitter()

  inputValue = new FormControl('')

  constructor() {}

  ngOnInit() {
    this.inputValue.setValue(this.defaultValue ?? '')
  }

  handlePressEnterKey() {
    this.onPressEnterKey?.emit(this.inputValue.value)
  }

  handleChangeInputText() {
    this.onChangeInputValue?.emit(this.inputValue.value)
  }
}
