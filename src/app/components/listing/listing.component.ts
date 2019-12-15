import { Component, OnInit, Input, Output,EventEmitter,TemplateRef,ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-table',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  checked:Boolean = true;
  @Input()  pagination;
  @Input() data;
  @Input() moduleName;
  @Input() fieldName;
  @Input() settings;
  @Input() editIcon;
  @Input() viewIcon;
  @Input() deleteIcon;
  @Input() statusIcon;
  @Input() approveIcon;
  // @Input() getUser;

  @Output() updateStatus = new EventEmitter();
  @Output() paginationChange = new EventEmitter();
  @Output() getInfo = new EventEmitter();
  @Output() pageChange = new EventEmitter();
  @Output() editStatus = new EventEmitter();

  dataSource;
  displayedColumns = [];
  public totalCount: number;
  page;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getPaginationNum();
    this.displayedColumns = this.settings;

  }


  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data.result);
    // this.dataSource = this.data.result;
    this.totalCount = this.data.count;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.settings;
  }

  getPaginationNum(){
    this.paginationChange.emit('test');
  }

  changeStatus(row){
    this.updateStatus.emit(row);
  }

  getRowInfo(row){
    this.getInfo.emit(row);
  }
   
  // when page change
  onChangePage(event): void {
    this.page = event.page;
    this.pageChange.emit(event.page);
  }
  
  // when edit action perform
  onEditConfirm(id): void {
    const checkEdit = { id, type: 'edit' };
    this.editStatus.emit(checkEdit);
  }
  // this.page = 4;
  getPageSymbol(current: number) {
    return ['1', '2', '3', '4', 'E', 'F', 'G'][current - 1];
  }
}
