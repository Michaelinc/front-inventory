import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commodity } from '../models/Commodity';

@Injectable({
  providedIn: 'root'
})
export class CommodityService {

  PATH="commodity";

  constructor(private http: HttpClient) { }

  private buildParams(commodity:any): string {
    let params: string = "?";
    for (let prop of Object.getOwnPropertyNames(commodity)) {
      console.log(prop)
        if(commodity[prop]!= null){
          params = params + prop + "=" + commodity[prop] + "&"
        }
    }
    params = params.slice(0,params.length - 1);
    return params;
  }



  public saveCommodity(commodity:Commodity):Observable<Commodity> {
    return this.http.post<Commodity>(environment.api + this.PATH, commodity)
  }

  public editCommodity(commodity:Commodity, userId : number):Observable<Commodity> {
    return this.http.put<Commodity>(environment.api + this.PATH + "?userId="+ userId, commodity)
  }

  public removeCommodity(commodityName:string,userId:number):Observable<boolean> {
    return this.http.delete<boolean>(environment.api + this.PATH + "?userId="+ userId+"&commodityName="+commodityName)
  }

  public getCommodities(): Observable<Commodity[]>{
    return this.http.get<Commodity[]>(environment.api + this.PATH);
  }

  public getCommoditiesByExample(commodity:any):Observable<Commodity[]> {
    return this.http.get<Commodity[]>(environment.api + this.PATH + "/findAllByExample" + this.buildParams(commodity));
  }

}
