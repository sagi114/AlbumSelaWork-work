import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HambergerService } from './hamberger-option/hamberger.service';
import { WelcomService } from './welcome-page/welcom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AlbumSela';
  public showHumborger:boolean=false;
  public ShowUser:boolean=false;
  public privateMode:boolean;
  constructor(private service:WelcomService,private router: Router,private hamService:HambergerService){
    this.getPrivateMode();
  }
  ngOnInit() {
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
      
        this.router.navigateByUrl('Private');
    }
    
  }
  addCatagory(){
    this.router.navigateByUrl('Hamboger/AddCatagory');
  }
  changeShowOfPictures(){
    this.hamService.changeDefoultViewOfPictures().subscribe(s=>console.log("changed view")
    );
  }
  getPrivateMode(){
    this.service.getPrivateMode().subscribe(b=>{
      this.privateMode=b
    })
  }
  navigetToRandomSlideShow(){
    this.router.navigateByUrl('Hamboger/SlideShow');
  }
}
