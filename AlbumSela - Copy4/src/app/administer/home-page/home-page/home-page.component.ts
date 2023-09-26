import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageService } from 'src/app/home-moudole/home-page.service';
import { libraryDetails } from 'src/app/Models/libraryDetails';
import { PictureModel } from 'src/app/Models/PictureModel';
import { TempleteViews } from 'src/app/Models/TempleteViews';
import { WelcomService } from 'src/app/welcome-page/welcom.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public AmountOfPics:number;
  

  @Output() returnPicturesNumber = new EventEmitter<number>();
  @Input() privateMode:boolean;
  @Input() isList:boolean;
  @Input() Temp:TempleteViews;
  @Input() library:libraryDetails;
  @Input() pictureDetails:PictureModel[];
  @Input() pictureImages:any[];

  constructor(private service:HomePageService,private router: Router,private welService:WelcomService) {
  }
  GetToPicturesPage(id){
    // this.router.navigateByUrl(`Home/specificPic2/${id}`);
    this.returnPicturesNumber.emit(id);
  }
  ReturnIfPicturIsPrivate(index){
    let moodprivate:boolean=false;
    if(this.pictureDetails===undefined||this.pictureDetails[index].information===undefined){
      // this.getLibrery();
      return false;
    }
    if(this.pictureDetails[index].information.privateMode!==undefined){
      moodprivate=this.pictureDetails[index].information.privateMode;
    }
    return moodprivate;
  }
 getPicturName(id){
   if(this.pictureDetails[id]===undefined||this.pictureDetails[id].information===undefined||this.pictureDetails[id].information.picturName===undefined)return "";
  return this.pictureDetails[id].information.picturName
 }
 getPicturesId(index){
   return this.pictureDetails[index].id
 }
 getPicturFavorite(id):boolean{
   if(this.pictureDetails[id]===undefined||this.pictureDetails[id].information===undefined)return false;
   return this.pictureDetails[id].information.Favorite
 }
 getPicturIsPrivate(id):boolean{
  if(this.pictureDetails[id]===undefined||this.pictureDetails[id].information===undefined)return false;
  return this.pictureDetails[id].information.privateMode
 }
 getLocation(id):string{
  if(this.pictureDetails[id]===undefined||this.pictureDetails[id].information===undefined)return "";
  if(this.checkIfTHereIsLocation(id)){
  return `Location (lat=${this.pictureDetails[id].information.location.lat},lng=${this.pictureDetails[id].information.location.lng})` 
 }
 else return "";
}
 checkIfTHereIsLocation(id):boolean{
  if(this.pictureDetails[id]===undefined||this.pictureDetails[id].information===undefined)return false;
  return this.pictureDetails[id].information.location!==undefined
 }
 getPick(num){
   return this.service.getPicsByIdSpecialForTry3(num);
 }
  getNumber(){
    this.service.getPicturesLenghtForTry3().subscribe(n=>
      {
        this.AmountOfPics=n.data
      })
  }
  ngOnInit(): void {
    this.getNumber();
  }
}
