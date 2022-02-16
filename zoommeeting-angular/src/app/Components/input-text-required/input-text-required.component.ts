import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-text-required',
  templateUrl: './input-text-required.component.html',
  styleUrls: ['./input-text-required.component.css']
})
export class InputTextRequiredComponent implements OnInit {

  @Input() name!: string

  constructor() { }

  ngOnInit(): void {
  }

}
