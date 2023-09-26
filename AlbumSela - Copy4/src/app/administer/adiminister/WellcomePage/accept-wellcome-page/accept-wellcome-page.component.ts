import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-accept-wellcome-page',
  templateUrl: './accept-wellcome-page.component.html',
  styleUrls: ['./accept-wellcome-page.component.css']
})
export class AcceptWellcomePageComponent implements OnInit {
  constructor() { }
  @Output() Finish = new EventEmitter<void>();
  public str:string="";
  public firstBool:boolean=false;
  public SecBool:boolean=false;
  public Thirdbool:boolean=false;
  ngOnInit(): void {
  }
  checkAcceptions(){
    console.log("firstBool");
    console.log(this.firstBool);
    console.log("SecBool");
    console.log(this.SecBool);
    console.log("Thirdbool");
    console.log(this.Thirdbool);
    
    this.str="To continue you have to accept all requirements"
    return this.firstBool===true&&this.SecBool===true&&this.Thirdbool===true;
  }
  GoToNextPagePage(){
    this.Finish.emit();
  }
  moveToNextPage(){
    if(this.checkAcceptions()){
      this.GoToNextPagePage()
    }
  }
}
