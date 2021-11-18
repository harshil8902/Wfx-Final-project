import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  ;
  orderDetails: any;
  date: any
  maxdate: any
  updateddata: any = []
  id: any = []
  checked: boolean = false;
  constructor(private router: Router, private orderservice: OrdersService, private fb: FormBuilder, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    let date: Date = new Date();
    date.setDate(date.getDate() + 30);
    this.maxdate = date.toISOString().slice(0, 10)
    this.date = new Date().toISOString().slice(0, 10);

    let orderItem = new FormArray([
      this.fb.group({
        article_name: new FormControl(""),
        price: new FormControl(""),
        qty: new FormControl(""),
        value: new FormControl(0)

      })
    ]);
    this.orderDetails = new FormGroup({
      order_no: new FormControl("",Validators.required),
      delivery_date: new FormControl("",Validators.required),
      order_type: new FormControl(""),
      delivery_address: new FormControl("",Validators.required),
      phone_no: new FormControl("",Validators.required),
      total_value: new FormControl(0),
      status:new FormControl("Confirmed"),
      "orderItem": new FormArray([
      ])
    })
    if (this.route.snapshot.params.edit == "edit") {
      let id = this.route.snapshot.params.id

      this.orderservice.getbyorderno(id).subscribe((data: any) => {
        this.orderDetails.controls.order_no.setValue(data.order_no)
        this.orderDetails.controls["order_no"].disable()
        this.orderDetails.controls.delivery_address.setValue(data.delivery_address)
        this.orderDetails.controls.delivery_date.setValue(data.delivery_date)
        this.orderDetails.controls["delivery_date"].disable()
        this.orderDetails.controls.phone_no.setValue(data.phone_no)
        this.orderDetails.controls.total_value.setValue(data.total_value)
        this.orderDetails.controls.order_type.setValue(data.order_type)
        this.orderDetails.controls.status.setValue(data.status)
        let editedorders = this.orders
        for (let i = 0; i < data.orderItem.length; i++) {
          let neworder = this.fb.group({
            "article_name": data.orderItem[i].article_name,
            "price": data.orderItem[i].price,
            "qty": data.orderItem[i].qty,
            "value": data.orderItem[i].value
          })
          editedorders.push(neworder)
        }
      })

    }

  }
get ordernum(){
  return this.orderDetails.get("order_no")

}
get ordertype(){
  return this.orderDetails.get("order_type")

}
get deliverydate(){
  return this.orderDetails.get("delivery_date")

}
get deliveryaddress(){
  return this.orderDetails.get("delivery_address")

}
get phonenum(){
  return this.orderDetails.get("phone_no")

}
  saveData() {
    if (this.route.snapshot.params.edit != "edit") {
      
      this.orderservice.saveorders(this.orderDetails.value).subscribe((result: any) => {
        this.router.navigate(['/']);
        alert(result.message)
      })

    }
    else {
      let id = this.route.snapshot.params.id;
      this.orderservice.updateDetails(id, this.orderDetails.value).subscribe((res: any) => {
        this.router.navigate(['/']);
        alert(res.message)
      })
    }
}

  get orders(): FormArray {
    return (this.orderDetails.get("orderItem") as FormArray);
  }
  addnewitem() {
    let orderarr = this.orders;
    let neworder = this.fb.group({
      "article_name": "",
      "price": "",
      "qty": "",
      "value": 0
    })
    orderarr.push(neworder);

  }
  getprice(i: any) {
    this.updatevalue();
    this.totalvalue;
  }
  getqantity(i: any) {
    this.updatevalue()
    this.totalvalue
  }
  gettotal(i: any) {
    this.updatevalue();
    this.totalvalue;
  }
  updatevalue() {
    this.orderDetails.value.orderItem.forEach((item: any) => {
      item.value = (item.price * item.qty);
    })
  }
  get totalvalue() {
    let total = 0;
    this.orderDetails.value.orderItem.forEach((item: any) => {
      total = (total + item.value);
    })
    return this.orderDetails.controls.total_value.setValue(total);
  }

  getcheckbocval(eve: any, i: number) {
    if (eve.target.checked) {
      this.id = i;
      this.checked = true;
    }
  }
  onDelete() {
    if (this.route.snapshot.params.edit != "edit") {
      if (this.checked) {
        this.orders.removeAt(this.id);
        this.checked = false;
        this.totalvalue;
      }
    }
    else {
      if (this.checked) {
        let orderno = this.orderDetails.value.order_no;
        let article = this.orderDetails.value.orderItem[this.id].article_name;
        this.orderservice.deleteArticle(orderno, article).subscribe((data: any) => {
          this.orders.removeAt(this.id);
          this.updatevalue();
          this.totalvalue;
        })
      }
    }
  }
  exit() {
    this.router.navigate(['/']);
  }
  onsubmit(){
    if(this.orderDetails.valid){
      return;
    }
    else{
      alert("Please fill all the mandatory fields*");
    }

  }
}
