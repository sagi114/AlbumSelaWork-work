import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-all-getting-images',
  templateUrl: './all-getting-images.component.html',
  styleUrls: ['./all-getting-images.component.css']
})
export class AllGettingImagesComponent implements OnInit {
  @Output() Finish = new EventEmitter<void>();
  public showCameraComponent:boolean=true;
  public showWebPicturesComponent:boolean=false;
  public showUploadComponent:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }
  returnToMainPage(){
    this.Finish.emit();
  }
  showCameraFunc(){
    this.showCameraComponent=true;
    this.showWebPicturesComponent=false;
    this.showUploadComponent=false;
  }
  showWebPicsFunc(){
    this.showCameraComponent=false;
    this.showWebPicturesComponent=true;
    this.showUploadComponent=false;
  }
  showUploadFunc(){
    this.showCameraComponent=false;
    this.showWebPicturesComponent=false;
    this.showUploadComponent=true;
  }

}
