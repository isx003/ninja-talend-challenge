import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${environment.API_URL}/users`)
  }

  saveUser(data: object){
    return this.http.post(`${environment.API_URL}/users`, data)
  }

  editUser(userId: number){
    return this.http.get(`${environment.API_URL}/users/${userId}`)
  }

  updateUser(userId: number, data: object){
    return this.http.put(`${environment.API_URL}/users/${userId}`, data)
  }

  deleteUser(userId:number){
    return this.http.delete(`${environment.API_URL}/users/${userId}`, {
      responseType: 'text'
    })
  }
}
