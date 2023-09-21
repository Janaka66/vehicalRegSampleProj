import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExtApiService {

  constructor(private http: HttpClient) {}


  addVehicals(vehicalDetails: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8081/vm/addVehicles', {'requestFields': vehicalDetails}, {responseType: 'text'})
        .subscribe({
          next: (response: any) => {
            
            alert(response);
          },
          error: (error: any) => {
          
            alert(error.error);
          }
        });
    });
  }

  getVehicals(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8081/vm/getVehicals', {}, {responseType: 'text'})
        .subscribe({
          next: (response: any) => {
            
            return resolve(JSON.parse(response));
          },
          error: (error: any) => {
          
            return reject(error);
          }
        });
    });
  }

  deleteVehicals(vehicalDetails: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8081/vm/deleteVehicals', {'requestFields': vehicalDetails}, {responseType: 'text'})
        .subscribe({
          next: (response: any) => {
            
            return resolve(JSON.parse(response));
          },
          error: (error: any) => {
          
            return reject(error);
          }
        });
    });
  }

}
