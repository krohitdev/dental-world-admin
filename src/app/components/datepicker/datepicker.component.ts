import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  constructor() { }
  @Input() class:string;
  defaultDate = new Date();
  @Input() date:Date;
  @Input() value:Date;

  @Output() dateChange = new EventEmitter();
  className;

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.className = this.class;
    this.defaultDate = this.value;
  }

  getDate(event:MatDatepickerInputEvent<Date>){
    this.dateChange.emit(event);
  }



}
