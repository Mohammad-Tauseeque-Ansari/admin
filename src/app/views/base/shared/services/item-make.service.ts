import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ItemMakeService {

  constructor(private http:HttpClient) { }

  postItemMake(data:any){
    return this.http.post<any>("http://localhost:3000/itemMake" , data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllItemMake(){
    return this.http.get<any>("http://localhost:3000/itemMake").pipe(map((res:any)=>{
      return res ;
    }))
  }

  deleteItemMake(id:number){
    return this.http.delete<any>("http://localhost:3000/itemMake/"+id).pipe(map((res:any)=>{
      return res ;
    }))
  }

  updateItemMake(data :any , id:number){
    return this.http.put<any>("http://localhost:3000/itemMake/"+id , data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

}
