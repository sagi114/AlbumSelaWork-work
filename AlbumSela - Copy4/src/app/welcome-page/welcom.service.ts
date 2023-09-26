import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { libraryDetails } from '../Models/libraryDetails';
import { map } from "rxjs/operators";
import { observable, Observable } from 'rxjs';
import {TempleteViews} from '../Models/TempleteViews'
import { PictureModel } from '../Models/PictureModel';

@Injectable({
  providedIn: 'root'
})
export class WelcomService {

  private baseUrl='http://localhost:4000';
  private headers=new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }

  getAmountOfPictur():Observable<number>{
    return this.http.get(`${this.baseUrl}/AmountOfPictures`)
            .pipe(map((res) => <number>(res)));
  }
  //getUrlToDownloadFromWeb
  DownloadFromWeb(Url:string):Observable<any>{
    console.log("got to get library");
    console.log(Url);
    
    return this.http.post(`${this.baseUrl}/getUrlToDownloadFromWeb`,JSON.stringify({url:Url}),{headers:this.headers})
    .pipe(map((res)=><any>(res)));
  } 
  getPicturById(id:number){
    return this.http.get(`${this.baseUrl}/getUrlPath/${id}`)
            .pipe(map((res) => <string>(res)));
  }
  getTemplats():Observable<any>{
    return this.http.get(`${this.baseUrl}/getTamplates`)
            .pipe(map((res) => <TempleteViews[]>(res)));
  }

  uploadImgFromBrowser(formData){
    console.log("uploded");
    
    this.http.post(`${this.baseUrl}/api/upload`, formData)
  .subscribe((response) => {
       console.log('response received is ', response);
  })
  }
  getLibraryById(num:number):Observable<libraryDetails>{
    console.log("got to get library");
    return this.http.post(`${this.baseUrl}/GetLibrary`,JSON.stringify({id:num}),{headers:this.headers})
    .pipe(map((res)=><libraryDetails>(res)));
  } 
  getLibrary():Observable<libraryDetails>{
    console.log("got to get library");
    return this.http.get(`${this.baseUrl}/GetLibrary`)
    .pipe(map((res)=><libraryDetails>(res)));
  } 
  ///GetUrlPathOfPictures
  GetUrlPathOfPictures():Observable<any>{
    return this.http.get(`${this.baseUrl}/getUrlPath`)
    .pipe(map((res)=><any>(res)));
  } 
  addImage(base64Image){
    this.http.post(`${this.baseUrl}/upload`, { image: base64Image })
      .subscribe((res) => {
        console.log(res);
      });
  }
  addLibrary(library:libraryDetails):Observable<libraryDetails>{
    console.log("service add Library");
    console.log(library);
    return this.http.post(`${this.baseUrl}/AddLibraryDetails`,JSON.stringify(library),{headers:this.headers})
    .pipe(map((res)=><libraryDetails>(res)));
  }

  updateLibrary(num:number,library:libraryDetails):Observable<libraryDetails>{
    return this.http.post(`${this.baseUrl}/UpdateLibrary`,JSON.stringify({id:num,infromation:library}),{headers:this.headers})
    .pipe(map((res)=><libraryDetails>(res)));
  }
  checkIfLibraryExist():Observable<boolean>{
     return this.http.get(`${this.baseUrl}/checkIfExistLibrary`)
    .pipe(map((res)=><boolean>(res)))
  }

  
  addPicture(pictur:PictureModel){
    return this.http.post(`${this.baseUrl}/AddPicturDetails`,JSON.stringify(pictur),{headers:this.headers})
    .pipe(map((res)=><PictureModel>(res)));
  }
  getPrivateMode():Observable<boolean>{
    return this.http.get(`${this.baseUrl}/GetPrivateMode`)
    .pipe(map((res)=><boolean>(res)))
  }
  changePrivateMode(boolInfo:boolean){
    this.http.post(`${this.baseUrl}/ChangePrivateMode`,JSON.stringify({boolInfo:boolInfo}),{headers:this.headers})
    .pipe(map((res)=>(res))).subscribe(a=>
      {console.log("success");
      })

  }
}
