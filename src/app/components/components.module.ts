import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './listing/listing.component';
import {MatTableModule} from '@angular/material/table';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { NgbdPaginationCustomization } from './pagination-customization';
import {MatTooltipModule} from '@angular/material/tooltip';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatetimepickerComponent } from './datetimepicker/datetimepicker.component';
import { SearchComponent } from './search/search.component';
import {MatSortModule} from '@angular/material/sort';
import { MapsComponent } from './maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { TagInputModule } from 'ngx-chips';
import { TagComponent } from './tag/tag.component';



@NgModule({
  declarations: [ListingComponent, TimepickerComponent,DatepickerComponent,DatetimepickerComponent, SearchComponent, MapsComponent,TagComponent],
  imports: [
    CommonModule,
    MatTableModule,
    NgxMaterialTimepickerModule.forRoot(),
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    // NgbModule,
    PaginationModule.forRoot(),
    MatTooltipModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSortModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD7Xxl2hB6G6-9uIHKs10C46sRjP0uqwkY',
      // apiKey: 'AIzaSyCJB0GiI9zN4sevJa2LLpiGxwJj7ff1_gY',
      // apiKey: 'AIzaSyDvjzCI0mP1vDFLVAJT6C1_Kqx6XVvaBtg',
      libraries: ['places']
    }),
    TagInputModule
  ],
  exports: [ListingComponent,TimepickerComponent,DatepickerComponent, DatetimepickerComponent, SearchComponent, MapsComponent,TagComponent]
})
export class ComponentsModule { }
