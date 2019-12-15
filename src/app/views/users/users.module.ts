import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './listing/users.component';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from '../../components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from './detail/detail.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [UsersComponent,DetailComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatInputModule,
    ComponentsModule,
    NgbModule,
    NgxSpinnerModule
  ]
})
export class UsersModule { }
