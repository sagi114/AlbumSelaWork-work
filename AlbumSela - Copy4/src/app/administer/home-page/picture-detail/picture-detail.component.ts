import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HomePageService } from 'src/app/home-moudole/home-page.service';
import { CatagoryModel } from 'src/app/Models/CatagoryModel';
import { PictureModel } from 'src/app/Models/PictureModel';
import { IDropdownSettings,} from 'ng-multiselect-dropdown';



@Component({
  selector: 'app-picture-detail',
  templateUrl: './picture-detail.component.html',
  styleUrls: ['./picture-detail.component.css']
})
export class PictureDetailComponent implements OnInit {

  ngOnInit() {
  }
  
  public picturName:string;
  @Input() num: number;
  // public num: number;
  private pictureDetails:PictureModel;
  public privateMode:boolean;
  public Favorite:boolean;
  public locationlng:number;
  public locationlat:number;
  public form: FormGroup;
  public CatagoryListString:string;
  checked: boolean;
  public AllCatagorys:CatagoryModel[];
  chouseLocation:boolean=false;
  public showCat:boolean=false;

  @Output() Finish = new EventEmitter<void>();

public Catagorys: { [key: string]: Object; }[] = [];
        // maps the local data column to fields property
        public localFields: Object = { text: 'Name', value: 'id' };
        // set the placeholder to MultiSelect Dropdown input element
        public localWaterMark: string = 'Select catagorys';
        public value: string[] = [];
  

  constructor(private service:HomePageService,private fb: FormBuilder,private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute) { 
    this.route.params.subscribe((params: Params) => {
      this.getAllCatagorys();
      console.log(this.num);
      if(this.num===undefined)this.num=0;
    this.getImgDetails();
    this.form = this.formBuilder.group({})
  })
  
  }
  onSubmit(form: NgForm): void {
    console.log(form.value.name);
    this.pictureDetails.information.Catagory=[];
    form.value.name.forEach(name => {
      let cm:CatagoryModel;
      cm=this.AllCatagorys.find(c=>c.id===parseInt(name))
        this.pictureDetails.information.Catagory.push(cm);
    });
    console.log(this.pictureDetails);
  }
  getCatagorysStart(){
    this.pictureDetails.information.Catagory.forEach(c=>{
      this.value.push(`${c.id}`)
    })
  }
  save(){
    console.log("save");
    console.log(this.pictureDetails);
    
    this.service.updatePicturInformation(this.pictureDetails);
    this.ReturnToMainPage();
    this.getImageDetailsFromService();
  }
  ReturnToMainPage(){
    this.Finish.emit();
  }
  changeName(){
    this.pictureDetails.information.picturName=this.picturName;
    console.log(this.pictureDetails.information.picturName);
  }
  checkIfIdIsEquall(id):boolean{
    const find=this.pictureDetails.information.Catagory.find(e=>e.id===id)
    return find!==undefined;
  }
  makeStart(){
    this.pictureDetails={id:0,information:{
      picturName:"",
      url: "",
      Catagory:[],
      location: {
        lat: 0,
        lng: 0
    },
    pictur: "",
    Favorite: false,
    privateMode: false
    }
  }
  }
  desideCatagory(id:number,nameOfCatagory:string){
      this.pictureDetails.information.Catagory.push({ CatagoryName:nameOfCatagory,id:id})
    console.log(this.pictureDetails);
  }
  getAllCatagorys(){
    
    this.service.getAllCatagorys().subscribe(c=>{
      console.log("got catagorys");
      
      console.log(c);
      
      this.AllCatagorys=c
      c.forEach(c=>{
        console.log(c.CatagoryName);
        
        this.Catagorys.push({ Name: `${c.CatagoryName}`, id: `${c.id}` })
      })
    })
  }
  ShowMap(){
    this.chouseLocation=!this.chouseLocation;
  }
  changeFavorite(e){
    console.log("favorite was changed");
    
    // this.Favorite=!this.Favorite;
    this.pictureDetails.information.Favorite=!this.pictureDetails.information.Favorite;
    console.log(this.Favorite);
    console.log(this.pictureDetails);
  }
  changeFavoriteClick(){
    console.log("favorite was changed");
    
    // this.Favorite=!this.Favorite;
    this.Favorite=!this.Favorite;
    this.pictureDetails.information.Favorite=!this.pictureDetails.information.Favorite;
    console.log(this.Favorite);
    console.log(this.pictureDetails);
  }
  changePrivateMode(e){
    console.log("Private was changed");
    // this.privateMode=!this.privateMode;
    this.pictureDetails.information.privateMode=this.privateMode;
    console.log(this.privateMode);
    console.log(this.pictureDetails);
  }
  changePrivateModeClick(){
    this.privateMode=!this.privateMode
    console.log("Private was changed");
    // this.privateMode=!this.privateMode;
    this.pictureDetails.information.privateMode=this.privateMode;
    console.log(this.privateMode);
    console.log(this.pictureDetails);
  }
  getlng(lng:number){
    this.pictureDetails.information.location.lng=lng;
    console.log(this.pictureDetails.information.location.lng);
    console.log(this.pictureDetails);
  }
  getlat(lat:number){
    this.pictureDetails.information.location.lat=lat;
    console.log(this.pictureDetails.information.location.lat);
    console.log(this.pictureDetails);
  }
  getPick(){
    // if(this.num===undefined)this.num=0;
    return this.service.getPicsByIdSpecialForTry3(this.num)
  }
  getImgDetails(){
    console.log("getting img details");
        this.getImageDetailsFromService();
  }
  getImageDetailsFromService(){
    this.service.getDeatilsOfAllPictures().subscribe(pd=>
      {
        this.makeStart();
        // this.pictureDetails=pd[this.num];
        
      this.makeStart();
      this.pictureDetails.id=pd[this.num].id
      
      if(pd[this.num].information.Catagory!==undefined){
        this.pictureDetails.information.Catagory=pd[this.num].information.Catagory
        this.getCatagorysStart();
        
        this.setCatagoryList();
      }
      if(pd[this.num].information.url!==undefined){this.pictureDetails.information.url=pd[this.num].information.url}
      if(pd[this.num].information.privateMode!==undefined){
        this.pictureDetails.information.privateMode=pd[this.num].information.privateMode
        this.privateMode=pd[this.num].information.privateMode;
      }
      if(pd[this.num].information.location!==undefined)
      {
        this.pictureDetails.information.location=pd[this.num].information.location;
        this.locationlat=this.pictureDetails.information.location.lat
        this.locationlng=this.pictureDetails.information.location.lng
      }
      if(pd[this.num].information.picturName!==undefined){
        this.pictureDetails.information.picturName=pd[this.num].information.picturName;
        this.picturName=pd[this.num].information.picturName;
      }
      if(pd[this.num].information.Favorite!==undefined){
        this.pictureDetails.information.Favorite=pd[this.num].information.Favorite;
      }
      if(pd[this.num].information.pictur!==undefined){this.pictureDetails.information.pictur=pd[this.num].information.pictur}
      this.privateMode=this.getPrivateMode();
      this.Favorite=this.getIfFavorite();
    
      })
  }
  setCatagoryList(){
    if(this.value.length!==0){
      this.CatagoryListString="Catagory list:";
      for (let index = 0; index < this.value.length; index++) {
        this.CatagoryListString=this.CatagoryListString+" "+this.AllCatagorys[parseInt(this.value[index])].CatagoryName
        if(index<this.value.length-1){this.CatagoryListString=this.CatagoryListString+','}
      }
      // this.localWaterMark=CatagoryListString;
    }
  }
  getPrivateMode(){
    console.log(this.pictureDetails.information.privateMode);
     return this.pictureDetails.information.privateMode
    
  }
  getIfFavorite(){
    console.log(this.pictureDetails.information.Favorite);
    return this.pictureDetails.information.Favorite
     
  }
  getCatagorys(){
    let Catagory:CatagoryModel[];
    if(this.pictureDetails.information.Catagory!==undefined){
      Catagory=this.pictureDetails.information.Catagory;
    }
    return Catagory;
  }
  showCatagorys(){
    this.showCat=!this.showCat;
  }
}
