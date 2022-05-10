import { Injectable } from '@angular/core';
import{HttpClient,HttpParams}from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient,private route: ActivatedRoute) { }
  url="http://192.168.3.122/api/order";
  
  saveorders(data: any){
    return this.http.post(this.url,data)
  }
  getData(){
    return this.http.get(this.url)
    }
  deleteArticle(orderno:any,articlename:any){
    return this.http.delete("http://192.168.3.122/api/order/"+orderno+"/"+articlename)

  }
  getbyorderno(orderno: any){
    return this.http.get("http://192.168.3.122/api/order/"+orderno)

  }
  updateDetails(orderno:any,updateddata:any){
    let endurl="http://192.168.3.122/api/order/"+orderno;
    return this.http.put(endurl,updateddata)
  }
  cancelorder(status:any,orderno:any){
    let canurl="http://192.168.3.122/api/order/cancel/"+orderno;
    return this.http.put(canurl,status)

  }
}
