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
date:any=""
orders:any=[]
orderno:any=""
checked:boolean=false
id:any=""
ngOnInit(): void {
  let date: Date = new Date();
  this.date = new Date().toISOString().slice(0, 10);

    this.orderservice.getData().subscribe((res:any)=>{
      this.orders=res;
    });
    
}
update(i:any){
  
  if(this.orders[i].status!="cancelled"){
  let orderno=this.orders[i].order_no;
    this.router.navigate(['form','edit',orderno]);
}
}
getcheckval(eve:any,i:any){
  this.id=i;
  if(eve.target.checked){
    this.orderno=this.orders[i].order_no;
    this.checked=true;
  }
  else{
    this.checked=false;
  }
}
cancelorder(){
  if(this.checked&&this.orders[this.id].delivery_date>this.date){
    let status="";
    this.orderservice.cancelorder(status,this.orderno).subscribe(result =>{
      window.location.reload()
      alert("order Cancelled Sucessfully");
      this.checked = false;
    })
  }
  else{
    alert("order can't be cancelled now");
    return;
  }
}
}
