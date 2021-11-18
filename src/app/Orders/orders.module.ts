import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import{ReactiveFormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    OrderFormComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderFormComponent,
    OrderListComponent
  ]

})
export class OrdersModule { }
