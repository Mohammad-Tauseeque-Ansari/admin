 
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http:HttpClient) { }

  postDesignation(data:any){
    return this.http.post<any>("http://localhost:3000/designation" , data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllDesignation(){
    return this.http.get<any>("http://localhost:3000/designation").pipe(map((res:any)=>{
      return res ;
    }))
  }

  deleteDesignation(id:number){
    return this.http.delete<any>("http://localhost:3000/designation/"+id).pipe(map((res:any)=>{
      return res ;
    }))
  }

  updateDesignation(data :any , id:number){
    return this.http.put<any>("http://localhost:3000/designation/"+id , data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

}

