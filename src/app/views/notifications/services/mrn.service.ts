import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class MrnService {
  constructor(private http: HttpClient) {}

  postmrnDetails(data: any) {
    return this.http.post<any>('http://localhost:3000/mrnNote', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAllmrnDetails() {
    return this.http.get<any>('http://localhost:3000/mrnNote').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getDepartment() {
    return this.http.get<any>('http://localhost:3000/department').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getSupplier() {
    return this.http.get<any>('http://localhost:3000/supplier').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getJobMaster() {
    return this.http.get<any>('http://localhost:3000/jobMaster').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getitemMaster() {
    return this.http.get<any>('http://localhost:3000/itemMaster').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deletemrnDetails(id: number) {
    return this.http.delete<any>('http://localhost:3000/mrnNote/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updatemrnDetails(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/mrnNote/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
