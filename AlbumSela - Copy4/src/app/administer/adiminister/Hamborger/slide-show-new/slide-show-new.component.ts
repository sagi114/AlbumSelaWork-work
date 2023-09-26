import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomePageService } from 'src/app/home-moudole/home-page.service';
import { PictureModel } from 'src/app/Models/PictureModel';

@Component({
  selector: 'app-slide-show-new',
  templateUrl: './slide-show-new.component.html',
  styleUrls: ['./slide-show-new.component.css']
})
export class SlideShowNewComponent implements OnInit {

  @Input() PrivateMode: boolean;
  @Output() Finish = new EventEmitter<void>();
  public slides:string[] = [];//"Here is slide1", "Here is slide 2", "Here is slide 3", "Questions?"
  activeSlide = 0;
  // @ViewChildren(ScrollSlideshowItemComponent) scrollItems: QueryList<ScrollSlideshowItemComponent>;
  private AmountOfPics:number;
  public pictureDetails:PictureModel[];

  constructor(private service:HomePageService) {
    //this.slides = this.slides.reverse();
    
    this.getDetailsOfPictures();
  }
  getDetailsOfPictures(){
    this.service.getDeatilsOfAllPictures().subscribe(pd=>
      {
        this.pictureDetails=pd;
        this.getNumber();
      })
  }
  returnToMainPage(){
    this.Finish.emit();
  }
  getRandomOrder(){
    let boolSizeOfPics:Boolean[]=[]
    for (let index = 0; index <this.AmountOfPics; index++) {
      boolSizeOfPics.push(false)
    }
    
    let NumbersOfRandomIndex:number[]=[];
    while(!boolSizeOfPics.every(b=>b===true)){
      const num=Math.floor(Math.random() * this.AmountOfPics);
      if(boolSizeOfPics[num]===false){
        boolSizeOfPics[num]=true;
        NumbersOfRandomIndex.push(num);
      }
    }
    console.log(NumbersOfRandomIndex);
    
    return NumbersOfRandomIndex;
  }
  addAllPictures(){
    // let arrNumb:number[];
    const arr:number[]=this.getRandomOrder();
    console.log(arr);
    
    console.log("pd"+this.pictureDetails);
    for (let index = 0; index < this.AmountOfPics; index++) {
      if(this.PrivateMode){
      this.slides.push(this.getPick(arr[index]))
      }
      else{
        console.log("not private mode");
        console.log(arr[index]);
        
        console.log(this.pictureDetails[arr[index]]);
        if(this.pictureDetails[arr[index]].information.privateMode===false||this.pictureDetails[arr[index]].information.privateMode===undefined){
          this.slides.push(this.getPick(arr[index]))
        }
        
      }
    }
    console.log("slides lenght"+this.slides.length);
    
  }
  getNumber(){
    this.service.getPicturesLenghtForTry3().subscribe(n=>
      {
        this.AmountOfPics=n.data;
        this.addAllPictures();
      })
  }
  getPick(num){
    return this.service.getPicsByIdSpecialForTry3(num)
  }


  ngOnInit(): void {
  }

}
