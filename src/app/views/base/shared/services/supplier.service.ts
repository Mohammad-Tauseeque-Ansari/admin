import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }

  postSupplier(data:any){
    return this.http.post<any>("http://localhost:3000/supplier",data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
 
  
  getSupplier(){
    return this.http.get<any>("http://localhost:3000/supplier")
    .pipe(map((res:any)=>{
      return res
    }))
  }

  updateSupplier(data :any , id:number){
    return this.http.put<any>("http://localhost:3000/supplier/"+id,data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  deleteSupplier(id:number){
    return this.http.delete<any>("http://localhost:3000/supplier/"+id)
    .pipe(map((res:any)=>{
      return res
    }))
  }



}







// http://localhost:3000/supplier