import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./listing/products.component";

// modules
import { MatInputModule } from "@angular/material/input";
import { ComponentsModule } from "../../components/components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxSpinnerModule } from "ngx-spinner";
import { MatSelectModule } from "@angular/material/select";

//component
import { FormComponent } from "./form/form.component";
import { DetailComponent } from "./detail/detail.component";

@NgModule({
  declarations: [ProductsComponent, DetailComponent, FormComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatInputModule,
    ComponentsModule,
    NgbModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule
  ]
})
export class ProductsModule {}
