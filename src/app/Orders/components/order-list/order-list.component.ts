import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  constructor(private router:Router, private orderservice:OrdersService) { 
  }
orders:any=[{"status":"confirmed"}]
status="confirmed"
ngOnInit(): void {
    this.orderservice.getData().subscribe((res:any)=>{
      this.orders=res;
    });
}
update(i:any){
  let orderno=this.orders[i].order_no;
    this.router.navigate(['form','edit',orderno]);
}
checked:boolean=false
id:any=""
getcheckval(eve:any,i:any){
  this.id=i
  if(eve.target.value){
    this.checked=true
  }
  

}
cancelorder(){
  if(this.checked){
    this.status="canceled"
    this.checked=false

  }
}
}
