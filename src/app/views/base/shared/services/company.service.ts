import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  postCompany(data:any){
    return this.http.post<any>("http://localhost:3000/company",data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
 
  
  getCompany(){
    return this.http.get<any>("http://localhost:3000/company")
    .pipe(map((res:any)=>{
      return res
    }))
  }

  updateCompany(data :any , id:number){
    return this.http.put<any>("http://localhost:3000/company/"+id,data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  deleteCompany(id:number){
    return this.http.delete<any>("http://localhost:3000/company/"+id)
    .pipe(map((res:any)=>{
      return res
    }))
  }

}