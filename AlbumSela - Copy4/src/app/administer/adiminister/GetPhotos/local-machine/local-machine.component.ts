import { Component, OnInit } from '@angular/core';
import { WelcomService } from 'src/app/welcome-page/welcom.service';

@Component({
  selector: 'app-local-machine',
  templateUrl: './local-machine.component.html',
  styleUrls: ['./local-machine.component.css']
})
export class LocalMachineComponent implements OnInit {

  nameOfFile:string="";
  uploadedFiles: Array < File > ;
  ClientChousFile:boolean=false;
  constructor(private service:WelcomService) { }
  fileChange(element) {
    this.uploadedFiles = element.target.files;
    this.ClientChousFile=true;
    this.nameOfFile=this.getFilesName();
    console.log(this.nameOfFile);
    
}
getFilesName(){
  let str:string="";
  if(this.uploadedFiles.length===0)return "";
  else{
    for (let index = 0; index <this.uploadedFiles.length; index++) {
      str = this.uploadedFiles[index].name+'';
      console.log(this.uploadedFiles[index].name);
      
    }
    return str;
  }
}
upload() {
  if(this.ClientChousFile){
  let formData = new FormData();
  for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
  }
  this.service.uploadImgFromBrowser(formData)
  this.ClientChousFile=false;
}
}

  ngOnInit(): void {
  }
}
