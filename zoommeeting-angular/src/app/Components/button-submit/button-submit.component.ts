import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InputLabelComponent } from '../input-label/input-label.component';

@Component({
  selector: 'app-button-submit',
  templateUrl: './button-submit.component.html',
  styleUrls: ['./button-submit.component.css']
})
export class ButtonSubmitComponent implements OnInit {

  @Input() text?: string
  @Input() alignment?: string

  @Output() btnClick = new EventEmitter()

  comp: InputLabelComponent = new InputLabelComponent;

  constructor() {}

  ngOnInit(): void {}

  btnClicked() {
    this.btnClick.emit()
  }
}
