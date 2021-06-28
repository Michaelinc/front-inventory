import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  PATH="role";

  constructor(private http: HttpClient) { }

  public saveRole(role:Role): Observable<Role>{
    return this.http.post<Role>(environment.api + this.PATH,role);
  }

  public getRoles(): Observable<Role[]>{
    return this.http.get<Role[]>(environment.api + this.PATH);
  }

}
