import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HambergerService {

  private baseUrl='http://localhost:4000';
  private headers=new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }

  AddCatagory(cat):Observable<any>{
    console.log("sevice trying to add a catagory");
    return this.http.post(`${this.baseUrl}/AddCatagory`,JSON.stringify({cat}),{headers:this.headers})
    .pipe(map((res)=><any>(res)));
  } 
  changeDefoultViewOfPictures():Observable<any>{
    ///changeViewOnImege/list/grid
    console.log("change list grid");
    
    return this.http.get(`${this.baseUrl}/changeViewOnImege/list/grid`)
            .pipe(map((res) =><any>(res)));
  }
}
