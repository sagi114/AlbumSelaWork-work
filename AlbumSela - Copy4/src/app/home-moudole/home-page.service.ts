import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable, Subject, Subscription } from 'rxjs';
// import axios from 'axios';
import { libraryDetails } from '../Models/libraryDetails';
import { CatagoryModel } from '../Models/CatagoryModel';
import { PictureModel } from '../Models/PictureModel';



@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private baseUrl='http://localhost:4000';
  private headers=new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }

  getPicturById(id:number):Observable<string>{
      return this.http.get(`${this.baseUrl}/getUrlPath/${id}`)
              .pipe(map((res) => <string>(res)));
  }
  getLenghtOfStorege():Observable<string>{
    return this.http.get(`${this.baseUrl}/getStoregeLength`)
              .pipe(map((res) => <string>(res)));
  }
  // hadGotIn=false;
  getPicturesLenghtForTry3():Observable<any>{
    // return som.data;
    return this.http.get(`${this.baseUrl}/GetAmountOfPictures`).pipe(
      map(res =><any>(res)))
  }
   getPicsByIdSpecialForTry3(id:number){//:Observable<string>
    
    // return (await axios.get(`${this.baseUrl}/getUrlPathOfGetPics/${id}`)).data
    //http://localhost:4000
    return `${this.baseUrl}/getUrlPathOfGetPics/${id}`
  }
  getlibraryType():Observable<any>{
    ///GetLibrary
    return this.http.get(`${this.baseUrl}/GetLibrary`)
    .pipe(map((res)=><any>(res)));
  }
  ///getImageDetailsFromDb/:id
  getImageDetailsFromDbTry3(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/getImageDetailsFromDb/${id}`).pipe(
      map(res =><any>(res)))
  }
  getAllCatagorys():Observable<CatagoryModel[]>{
    return this.http.get(`${this.baseUrl}/GetAllCatagory`).pipe(
      map(res =><CatagoryModel[]>(res)))
  }
  updatePicturInformation(picturInfro:PictureModel):void{
    ///UpdatePictur
    console.log("update");
    
    this.http.post(`${this.baseUrl}/UpdatePictur`, picturInfro)
  .subscribe((response) => {
       console.log('response received is ', response);
  })
  }
  getImgDetailsTrySecond(id:number):Observable<any>{
    ///GetPicturesDetails
    return this.http.post(`${this.baseUrl}/GetPicturesDetailsTry1`,JSON.stringify({id:id}),{headers:this.headers})
    .pipe(map(res =><any>(res)))
  }
  getLibraryLenght():Observable<any>{
    return this.http.get(`${this.baseUrl}/returnlibraryLenght`).pipe(
      map(res =><any>(res)))
  }
  ///getDetailsOfAllPictures
  getDeatilsOfAllPictures():Observable<PictureModel[]>{
    return this.http.get(`${this.baseUrl}/getDetailsOfAllPictures`).pipe(
      map(res =><PictureModel[]>(res)))
  }

}

