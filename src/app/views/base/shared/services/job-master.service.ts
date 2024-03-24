import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobMasterService {

  constructor(private http:HttpClient) { }
  postJobMaster(data:any){
    return this.http.post<any>("http://localhost:3000/jobMaster" , data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllJobMaster(){
    return this.http.get<any>("http://localhost:3000/jobMaster").pipe(map((res:any)=>{
      return res ;
    }))
  }

  deleteJobMaster(id:number){
    return this.http.delete<any>("http://localhost:3000/jobMaster/"+id).pipe(map((res:any)=>{
      return res ;
    }))
  }

  updateJobMaster(data :any , id:number){
    return this.http.put<any>("http://localhost:3000/jobMaster/"+id , data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}
