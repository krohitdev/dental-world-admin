import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() search = new EventEmitter();
  @Output() clear = new EventEmitter();
  searchValue='';
  constructor() { }

  ngOnInit() {
  }

  // ngOnChanges(): void {
  //   // this.searchValue = this.search;
  // }

  Search(){
    let value = this.searchValue.trim();
    if(value.length>0){
      this.search.emit(value);
    }
  }
  

  clearSearch(){
    this.searchValue = '';
    this.clear.emit();
  }
}
