import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemMasterService {
  constructor(private http: HttpClient) {}

  getAllItemMaster() {
    return this.http.get<any>('http://localhost:3000/itemMaster').pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  postItemMaster(data: any) {
    return this.http.post<any>('http://localhost:3000/itemMaster', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateItemMaster(data: any, id: number) {
    return this.http
      .put<any>('http://localhost:3000/itemMaster/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteItemMaster(id: number) {
    return this.http.delete<any>('http://localhost:3000/itemMaster/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }



  getSupplier(){
    return this.http.get<any>("http://localhost:3000/supplier")
    .pipe(map((res:any)=>{
      return res
    }))
  }

  getItemMake(){
    return this.http.get<any>("http://localhost:3000/itemMake").pipe(map((res:any)=>{
      return res ;
    }))
  }

  getItemCategory(){
    return this.http.get<any>("http://localhost:3000/itemCategory").pipe(map((res:any)=>{
      return res ;
    }))
  }





}
