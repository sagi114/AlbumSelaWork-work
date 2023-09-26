import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { WelcomService } from 'src/app/welcome-page/welcom.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  @Output() Finish = new EventEmitter<void>();
  public PrivateMessege:string="";
  // public Password:string="";
  form: FormGroup;
  private password:string
  constructor( private service:WelcomService) { 
    this.getPassword();
  }

  ngOnInit(): void {
  }
  goToPrivateMode(){
    this.service.changePrivateMode(true);
  }
  getPassword(){
    this.service.getLibrary().subscribe(l=>{
      console.log(l);
      
      this.password=l.password
    })
  }
  checkIfPasswordIsTrue(password){
        console.log("passord from server");
        
        console.log(this.password);
        console.log("users password");
        
        console.log(password);
        
        if(this.password==password){
          console.log("password correct");
          this.PrivateMessege=""
          this.goToPrivateMode();
          this.GoToHomePage();
        }
        else{
          console.log("password incorrect");
          this.PrivateMessege="Password is incorrect"
        }
  }
  GoToHomePage(){
    this.Finish.emit();
  }

}
