import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {

  constructor(private http:HttpClient) { }

  postItemCategory(data:any){
    return this.http.post<any>("http://localhost:3000/itemCategory" , data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllItemCategory(){
    return this.http.get<any>("http://localhost:3000/itemCategory").pipe(map((res:any)=>{
      return res ;
    }))
  }

  deleteItemCategory(id:number){
    return this.http.delete<any>("http://localhost:3000/itemCategory/"+id).pipe(map((res:any)=>{
      return res ;
    }))
  }

  updateItemCategory(data :any , id:number){
    return this.http.put<any>("http://localhost:3000/itemCategory/"+id , data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  


}
