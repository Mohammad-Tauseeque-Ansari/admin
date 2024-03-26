 
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class TaxDiscountService {

  constructor(private http:HttpClient) { }

  postTaxDiscount(data:any){
    return this.http.post<any>("http://localhost:3000/taxDiscount" , data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllTaxDiscount(){
    return this.http.get<any>("http://localhost:3000/taxDiscount").pipe(map((res:any)=>{
      return res ;
    }))
  }

  deleteTaxDiscount(id:number){
    return this.http.delete<any>("http://localhost:3000/taxDiscount/"+id).pipe(map((res:any)=>{
      return res ;
    }))
  }

  updateTaxDiscount(data :any , id:number){
    return this.http.put<any>("http://localhost:3000/taxDiscount/"+id , data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}
