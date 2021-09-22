import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product/product/product.component";
import {OrderComponent} from "./order/order/order.component";
import {OrderDetailComponent} from "./order/order-detail/order-detail.component";

const routes: Routes = [
  { path: 'order', component: OrderComponent},
  { path: 'product', component: ProductComponent },
  { path: 'order/:tokenValue', component: OrderDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
