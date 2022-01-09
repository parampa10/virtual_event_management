import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-label',
  templateUrl: './input-label.component.html',
  styleUrls: ['./input-label.component.css']
})

export class InputLabelComponent implements OnInit {

  @Input() type!: string
  @Input() text!: string
  @Input() name!: string
  @Input() value!: string
  @Input() isRequired: boolean = false
  @Input() btnClicked: boolean = false

  @Output() fetchData = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {}

  data: any
  isEmpty: boolean = false
  isValid: boolean = true
  isIncorrect: boolean = false

  telPattern = /^[0-9]+$/
  emailPattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
  errorText = ""

  addInputData(e: any) {
    console.log(e)
  }

  checkValidation() {
    if (!this.data) {
      if (this.value) {
        this.data = this.value
      } else {
        this.isEmpty = true
        this.isValid = true
        this.errorText = `${this.text} is required.`
      }
    } else {
      if (this.type === 'tel' ) {
        if (!isNaN(this.data)) {
          if (this.data.length !== 10) {
            this.isValid = false
            this.errorText = `${this.text} must be of 10 digits only.`
          }
        } else {
          this.isValid = false
          this.errorText = `${this.text} must contain digits only.`
        }
      } else if (this.type === 'email') {
        if (!this.emailPattern.test(this.data)) {
          this.isValid = false
          this.errorText = `Please enter valid Email Address.`
        }
      }
    }
    this.inputDataEmit()
  }

  inputDataEmit() {
    if (this.btnClicked) {
      const name = this.name
      const data = this.data
      this.fetchData.emit({ name, data })
    }
  }
}
