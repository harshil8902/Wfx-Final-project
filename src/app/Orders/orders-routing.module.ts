import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderFormComponent } from './components/order-form/order-form.component';
import{ OrderListComponent}from './components/order-list/order-list.component';
const routes: Routes = [
  {path:"",component:OrderListComponent},
  {path:"cancel",component:OrderListComponent},
  {path:"form",component:OrderFormComponent},
  {path:"form/:edit/:id",component:OrderFormComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
