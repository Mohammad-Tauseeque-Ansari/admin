import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ContarcterService {

  constructor(private http:HttpClient) { }

  postContracter(data:any){
    return this.http.post<any>("http://localhost:3000/contracter" , data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllContracter(){
    return this.http.get<any>("http://localhost:3000/contracter").pipe(map((res:any)=>{
      return res ;
    }))
  }

  deleteContracter(id:number){
    return this.http.delete<any>("http://localhost:3000/contracter/"+id).pipe(map((res:any)=>{
      return res ;
    }))
  }

  updateContracter(data :any , id:number){
    return this.http.put<any>("http://localhost:3000/contracter/"+id , data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}
