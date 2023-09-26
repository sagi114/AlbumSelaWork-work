import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HambergerService } from 'src/app/hamberger-option/hamberger.service';
import { HomePageService } from 'src/app/home-moudole/home-page.service';
import { libraryDetails } from 'src/app/Models/libraryDetails';
import { PictureModel } from 'src/app/Models/PictureModel';
import { TempleteViews } from 'src/app/Models/TempleteViews';
import { WelcomService } from 'src/app/welcome-page/welcom.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-adiminister',
  templateUrl: './adiminister.component.html',
  styleUrls: ['./adiminister.component.css']
})
export class AdiministerComponent implements OnInit {
  title = 'AlbumSela';
  public showHumborger:boolean=false;
  public ShowUser:boolean=false;
  public privateMode:boolean;
  private library:libraryDetails;
  private Temp:TempleteViews;

  public ShowHomePage:boolean=true;
  public ShowPageDetails:boolean=false;
  public ShowHelloClientWellcomePage:boolean=false;
  public ShowAccseptRequires:boolean=false
  public ShowCreatelibrary:boolean=false;
  public ShowPrivate:boolean=false;
  public ShowCatagoryEdit:boolean=false;
  public ShowSlideShow:boolean=false;
  public ShowGetPictures:boolean=false;
  public lightColor:boolean=false;

  public ShowingPicNum:number;
  public isList:boolean;
  public pictureDetails:PictureModel[];
  public AmountOfPics:number;
  public picImages:any[]=[];
  public SearchWord:string;
  public SearchWordCatagory:string;


  constructor(private service:WelcomService,@Inject(DOCUMENT) private document: Document,private homeservice:HomePageService,private homeService:HomePageService,private router: Router,private hamService:HambergerService){
    this.getPrivateMode();
    this.cheakIfLibraryExist();
    this.getDetailsOfPictures(()=>{console.log("got all details");
    });
    this.getNumber(()=> {
      console.log("in cunstructor");
    });
  }
  NavigateToAboutPage(){
      this.router.navigateByUrl(`about`);
  }
  changeLightColor(){
    this.lightColor=!this.lightColor
  }
  switchModeToObserve(){
    
    this.ShowPageDetails=false;
    this.ShowHelloClientWellcomePage=false;
    this.ShowAccseptRequires=false
    this.ShowCreatelibrary=false;
    this.ShowPrivate=false;
    this.ShowCatagoryEdit=false;
    this.ShowSlideShow=false;
    // this.lightColor=false;
    if(this.ShowHomePage==true){
      this.ShowHomePage=false;
      this.ShowGetPictures=true;
    }
    else{
      this.ShowGetPictures=false;
      this.goToHomePage();
    }
  }
  searchFuncCatagory(e){
    console.log(e);
    if(e===""){
      this.getNumber(()=>{
        console.log("all pictures");
      });
      this.getDetailsOfPictures(()=>{console.log("got all pics details");})
    }
    else{
        this.getDetailsOfPictures(()=>{
          this.pictureDetails= this.pictureDetails.filter((pd)=>pd.information.Catagory!==undefined)
          this.pictureDetails= this.pictureDetails.filter((pd)=>pd.information.Catagory.length!==0)
          
          this.pictureDetails= this.pictureDetails.filter((pd)=>pd.information.Catagory.find(c=>c.CatagoryName.startsWith(e)))
          console.log(this.pictureDetails);
          
          // this.pictureDetails= this.pictureDetails.filter((pd)=>pd.information.Catagory.filter(c=>c.CatagoryName.startsWith(e)))
          console.log(this.pictureDetails);
          this.homeservice.getPicturesLenghtForTry3().subscribe(n=>
            {
              this.picImages=[];
              this.AmountOfPics=n.data
              for (let index = 0; index <this.pictureDetails.length; index++) {
                const pic=this.getPick(this.pictureDetails[index].id);
                this.picImages.push(pic);
              }
            })
        })
    }
    
  }
  searchFunc(e){
    console.log(e);
    if(e===""){
      this.getNumber(()=>{
        console.log("all pictures");
      });
      this.getDetailsOfPictures(()=>{console.log("got all pics details");})
    }
    else{
        //const startsWithN = countries.filter((country) => country.startsWith("N"));
        this.getDetailsOfPictures(()=>{
          this.pictureDetails= this.pictureDetails.filter((pd)=>pd.information.picturName!==undefined)
          this.pictureDetails= this.pictureDetails.filter((pd)=>pd.information.picturName.startsWith(e))
          console.log(this.pictureDetails);
          this.homeservice.getPicturesLenghtForTry3().subscribe(n=>
            {
              this.picImages=[];
              this.AmountOfPics=n.data
              for (let index = 0; index <this.pictureDetails.length; index++) {
                const pic=this.getPick(this.pictureDetails[index].id);
                this.picImages.push(pic);
              }
            })
        })
    }
    
  }
  getPick(num:number){
    return this.homeservice.getPicsByIdSpecialForTry3(num)
  }
  getNumber(callback){
    this.homeservice.getPicturesLenghtForTry3().subscribe(n=>
      {
        this.picImages=[];
        this.AmountOfPics=n.data
        for (let index = 0; index < this.AmountOfPics; index++) {
          const pic=this.getPick(index);
          this.picImages.push(pic);
          callback();
        }
      })
  }
  getDetailsOfPictures(callback){
    this.homeservice.getDeatilsOfAllPictures().subscribe(pd=>
      {
        this.pictureDetails=pd
        callback();
      })
  }
  exitApplicaton(){
    document.location.href = 'https://www.google.co.il';
  }
 GoToSlideShow(){
  this.ShowHomePage=false;
  this.ShowPageDetails=false;
  this.ShowHelloClientWellcomePage=false;
  this.ShowAccseptRequires=false
  this.ShowCreatelibrary=false;
  this.ShowPrivate=false;
  this.ShowCatagoryEdit=false;
  this.ShowSlideShow=true;
  this.ShowGetPictures=false;
  }
  addCatagory(){
    this.ShowHomePage=false;
    this.ShowPageDetails=false;
    this.ShowHelloClientWellcomePage=false;
    this.ShowAccseptRequires=false
    this.ShowCreatelibrary=false;
    this.ShowPrivate=false;
    this.ShowCatagoryEdit=true;
    this.ShowSlideShow=false;
    this.ShowGetPictures=false;
  }
  goToPrivate(){
    this.ShowHomePage=false;
    this.ShowPageDetails=false;
    this.ShowHelloClientWellcomePage=false;
    this.ShowAccseptRequires=false
    this.ShowCreatelibrary=false;
    this.ShowPrivate=true;
    this.ShowCatagoryEdit=false;
    this.ShowSlideShow=false;
    this.ShowGetPictures=false;
  }
  getPhotos(){
      this.ShowHomePage=false;
      this.ShowPageDetails=false;
      this.ShowHelloClientWellcomePage=false;
      this.ShowAccseptRequires=false
      this.ShowCreatelibrary=false;
      this.ShowPrivate=false;
      this.ShowCatagoryEdit=false;
      this.ShowSlideShow=false;
      this.ShowGetPictures=true;
  }
  getTemplate(){
    this.Temp=this.library.DefultViewTemplate;
    console.log("Templat"+this.Temp);
    
    if(this.Temp.id===1)this.isList=true;
  }
 getLibrery(){
   this.homeservice.getLibraryLenght().subscribe(n=>{
       this.getInformationFromService();
   })
 }
 getInformationFromService(){
  this.homeservice.getlibraryType().subscribe(l=>
    {
      this.library=l
      this.getTemplate();
    })
 }
  ngOnInit() {
  }
  returnOnPrivateModeToHomePage(){
    this.getNumber(()=> {
      this.privateMode=true;
      this.ShowHomePage=true;
      
    });
    this.ShowPrivate=false;
  }
  GoToCreateLibrary(){
    console.log("move page");
    
    this.ShowAccseptRequires=false;
    this.ShowCreatelibrary=true;
  }
  createeLibrary(str){
    if(str=="List"){this.isList=true}
    this.getLibrery();
    this.goToHomePage();
  }
  cheakIfLibraryExist(){
    this.homeService.getLibraryLenght().subscribe(n=>{
      if(n===0){
        this.ShowHomePage=false;
        this.ShowHelloClientWellcomePage=true;
      }
      else{
        this.getLibrery()
      }
    })
  }
  goToAccseptPage(){
    this.ShowHelloClientWellcomePage=false;
    this.ShowAccseptRequires=true
  }
  goToHomePage(){
    this.getNumber(()=> {
      console.log(this.ShowHomePage);
      this.getDetailsOfPictures(()=>{
        this.ShowHomePage=true;
        this.picImages=[];
        for (let index = 0; index < this.pictureDetails.length; index++) {
          this.picImages.push(this.getPick(this.pictureDetails[index].id))
        }
      })
    });
    
    this.ShowPageDetails=false;
    this.ShowCreatelibrary=false;
    this.ShowCatagoryEdit=false;
    this.ShowSlideShow=false;
    this.ShowGetPictures=false;
  }
  goToPicturesDetail(id){
    this.ShowHomePage=false;
    this.ShowingPicNum=id;
    this.ShowPageDetails=true;
  }
  burgerMenuClick() {
    this.showHumborger=!this.showHumborger
  }
  ShowUserFunc(){
    this.ShowUser=!this.ShowUser
  }
  changePrivateMode(){
    if(this.privateMode){
    this.privateMode=!this.privateMode;
    this.service.changePrivateMode(this.privateMode);
    }
    else{
      console.log("move to private");
      this.goToPrivate();
    }
  }
  changeShowOfPictures(){
    this.isList=!this.isList;
    this.hamService.changeDefoultViewOfPictures().subscribe(s=>console.log("changed view")
    );
  }
  getPrivateMode(){
    this.service.getPrivateMode().subscribe(b=>{
      this.privateMode=b
    })
  }
 
}
