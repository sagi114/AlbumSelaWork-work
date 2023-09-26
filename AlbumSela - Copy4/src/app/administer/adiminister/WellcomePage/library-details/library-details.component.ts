import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { libraryDetails } from 'src/app/Models/libraryDetails';
import { TempleteViews } from 'src/app/Models/TempleteViews';
import { WelcomService } from 'src/app/welcome-page/welcom.service';

@Component({
  selector: 'app-library-details',
  templateUrl: './library-details.component.html',
  styleUrls: ['./library-details.component.css']
})
export class LibraryDetailsComponent implements OnInit {

  templates:TempleteViews[]
  newDetails:libraryDetails;
  @Output() Finish = new EventEmitter<string>();
  private stringInput:string;
  constructor(private service:WelcomService) { 
    
  }

  ngOnInit(): void {
    this.newDetails={
      libraryName:'', Details:'', DefultViewTemplate:{TemplateName:'',id:0},password:'',privateMode:false
    }
    this.service.getTemplats().subscribe(x =>{
      this.templates = x.TemplateNameDal;
      console.log(x)
    });
     
  }
  checkValidTemplate(invalid){
    this.newDetails
    if(this.newDetails.DefultViewTemplate.TemplateName!==''&&this.newDetails.DefultViewTemplate.id!==0){
      this.stringInput=this.newDetails.DefultViewTemplate.TemplateName;
      console.log(invalid);
      console.log("invalid");
      
      if(!invalid){
        return false;
      }
      return true;
    }
    return true;
  }
  GoToNextPage(){
    this.Finish.emit(this.stringInput);
  }
  onsubmit(DetailsOfLibrary:libraryDetails){
    console.log("onsubmit");
    
    this.service.addLibrary(DetailsOfLibrary).subscribe(
      x=>console.log("got answer")
      
    )
    console.log("Added library");
    this.GoToNextPage();
  }

}
