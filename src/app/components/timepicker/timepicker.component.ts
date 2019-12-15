import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title = 'demo';
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

  onChangeHour(event) {
  }
}
