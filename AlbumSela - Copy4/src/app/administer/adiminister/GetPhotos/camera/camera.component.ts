import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WelcomService } from 'src/app/welcome-page/welcom.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  public pictur:string;
  @ViewChild('video')
  public video: ElementRef;
  

  @ViewChild('canvas')
  public canvas: ElementRef;
  public ShowCamera:boolean=true;

  public constructor(private http: HttpClient,private service:WelcomService) {}

  public ngOnInit() {}

  onTakingAPictur(){
    this.puttingPicturOnCanvas();
    this.pictur=this.canvas.nativeElement.toDataURL('image/png')
    this.TurnCamraOffOn();
    // console.log(this.canvas.nativeElement.toDataURL('image/png'));
  }
  puttingPicturOnCanvas(){
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);
  }
  TurnCamraOffOn(){
    this.ShowCamera=!this.ShowCamera;
  }
  TryAgian(){
    this.TurnCamraOffOn()
  }

  // using window.URL.createObjectURL will not work (and browser drop support for it) so you will need to pass the
  // stream object from the call back of getUserMedia directly to the video.nativeElement.srcObject
  // TODO: explain viewChild
  public ngAfterViewInit() {
    console.log('TEST ngAfterViewInit');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    // you will need to draw the image on a canvas so you can extract the data and save it
    // the canvas will be display:none
    // this.puttingPicturOnCanvas();
    // send the image as base64 to the server
    console.log(this.pictur);
    
    this.uploadToServer(this.pictur);
    console.log("captured");
    
  }

  onFileSelected(fileInputEvent: any) {
    let file = fileInputEvent.target.files[0];
    let reader = new FileReader();

    //convert file (any file) to DataUrl
    reader.readAsDataURL(file);
    // make reference to the method so you can pass the reader results
    let f = (file) => {
      this.uploadToServer(file);
    };
    // after the reader is finished
    reader.onload = () => {
      // call the method reference
      f(reader.result);
    };
  }

  uploadToServer(base64Image) {
    // console.log(base64Image);
    
    this.service.addImage(base64Image)
  }
}


