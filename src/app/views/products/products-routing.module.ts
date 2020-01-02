import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsComponent } from "./listing/products.component";
import { DetailComponent } from "./detail/detail.component";
import { FormComponent } from "./form/form.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    data: {
      title: "Products"
    }
  },
  {
    path: "detail/:id",
    component: DetailComponent,
    data: {
      title: "Product detail"
    }
  },
  {
    path: "add",
    component: FormComponent,
    data: {
      title: "Add Product"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
