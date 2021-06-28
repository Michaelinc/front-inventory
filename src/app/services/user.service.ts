import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH="user";

  constructor(private http: HttpClient) { }

  public saveUser(user: User): Observable<User>{
    return this.http.post<User>(environment.api + this.PATH,user);
  }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(environment.api + this.PATH);
  }
}
