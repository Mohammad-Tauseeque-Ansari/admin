import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
 import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class JobContracterService {

  constructor(private http:HttpClient) { }

  postJobContracter(data:any){
    return this.http.post<any>("http://localhost:3000/jobContracter" , data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllJobContracter(){
    return this.http.get<any>("http://localhost:3000/jobContracter").pipe(map((res:any)=>{
      return res ;
    }))
  }
  getContracterNames(){
    return this.http.get<any>("http://localhost:3000/contracter").pipe(map((res:any)=>{
      return res ;
    }))
  }
  getJobMasterNames(){
    return this.http.get<any>("http://localhost:3000/jobMaster").pipe(map((res:any)=>{
      return res ;
    }))
  }

  deleteJobContracter(id:number){
    return this.http.delete<any>("http://localhost:3000/jobContracter/"+id).pipe(map((res:any)=>{
      return res ;
    }))
  }

  updateJobContracter(data :any , id:number){
    return this.http.put<any>("http://localhost:3000/jobContracter/"+id , data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}