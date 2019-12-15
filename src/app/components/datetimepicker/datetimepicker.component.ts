import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss']
})
export class DatetimepickerComponent implements OnInit {

  range = 1;
  @Input() class:string;
  @Input() datetime;
  @Input() startAt;
  @Input() placeholder;
  
  defaultDate:Date;
  className:string;
  placeholderValue:string;

  @Output() dateTimeChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.className = this.class;
    this.defaultDate = this.startAt;
    this.placeholderValue = this.placeholder;
  }

  getDate(event){
    this.dateTimeChange.emit(event);
  }

}
