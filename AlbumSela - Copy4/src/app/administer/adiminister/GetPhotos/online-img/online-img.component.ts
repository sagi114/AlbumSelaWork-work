import { Component, OnInit } from '@angular/core';
import { WelcomService } from 'src/app/welcome-page/welcom.service';
import { PexelPhotoSearchService } from './pexel-photo-search.service';

@Component({
  selector: 'app-online-img',
  templateUrl: './online-img.component.html',
  styleUrls: ['./online-img.component.css']
})
export class OnlineImgComponent{

  searchData;  
  perPage: any;  
  photos = [];  
  constructor(private pexelPhotoSearchService: PexelPhotoSearchService,private service: WelcomService) { 
  }  
  
  search() {  
    this.pexelPhotoSearchService.getdata(this.searchData, this.perPage).subscribe((response: any) => {  
      console.log(response);  
      this.photos = response.photos;  
    }, (error) => {  
      console.log(error);  
    })  
  }
  loadPicturToServer(url){
    console.log("uploadin pic");
    this.service.DownloadFromWeb(url).subscribe(a=>"download works")
  }
 

}
