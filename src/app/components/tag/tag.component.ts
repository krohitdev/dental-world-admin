import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Input() tags;
  @Input() editable;
  // @Input() themeOption;

  tagsInput = [];
  themeOption:string = 'bootstrap';
  tagEditable: Boolean = false;

  @Output() tagValue = new EventEmitter();
  @Output() onAdd = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onTagEdited = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges():void{
    this.tagsInput = this.tags;
    this.tagEditable = this.editable;
  }

  onItemEdit(event):void {
    this.onTagEdited.emit(event)
  }

  onSelected(event):void {
    this.onSelect.emit(event) 
  }

  onItemRemoved(event):void {
    this.onRemove.emit(event);
  }
  onItemAdded(event):void{
    this.onAdd.emit(event);
  }
}
