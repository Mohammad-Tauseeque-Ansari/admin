
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UserDepartmentService {

  constructor(private http:HttpClient) { }

  postUserDepartment(data:any){
    return this.http.post<any>("http://localhost:3000/userDepartment" , data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllUserDepartment(){
    return this.http.get<any>("http://localhost:3000/userDepartment").pipe(map((res:any)=>{
      return res ;
    }))
  }

  deleteUserDepartment(id:number){
    return this.http.delete<any>("http://localhost:3000/userDepartment/"+id).pipe(map((res:any)=>{
      return res ;
    }))
  }

  updateUserDepartment(data :any , id:number){
    return this.http.put<any>("http://localhost:3000/userDepartment/"+id , data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

}
