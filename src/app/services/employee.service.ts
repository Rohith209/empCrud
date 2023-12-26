import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  Empdata: any;

  constructor(private http: HttpClient) { }
  private baseEndPointURL = `http://localhost:3000/employees`;
  addEmployee(data: any) {
    let reqHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.Empdata = this.http.post(this.baseEndPointURL, data);
    return this.Empdata;
  }

  getEmployees() {
    this.Empdata = this.http.get(this.baseEndPointURL);
    return this.Empdata;
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.baseEndPointURL + '/' + id);
  }

  updateEmployee(employee: any, id: number) {
    return this.http.put(this.baseEndPointURL + "/" + id, employee);
  }
}
