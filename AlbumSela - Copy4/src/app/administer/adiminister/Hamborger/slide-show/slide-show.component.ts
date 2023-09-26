import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, ViewChildren, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { PictureModel } from 'src/app/Models/PictureModel';
import { HomePageService } from '../../../../home-moudole/home-page.service';
import { ScrollSlideshowItemComponent } from '../slide-show/scroll-slideshow-item/scroll-slideshow-item.component';


@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  @Input() PrivateMode: boolean;
  @Output() Finish = new EventEmitter<void>();
  slides = [];//"Here is slide1", "Here is slide 2", "Here is slide 3", "Questions?"
  activeSlide = 0;
  @ViewChildren(ScrollSlideshowItemComponent) scrollItems: QueryList<ScrollSlideshowItemComponent>;
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

  ngOnInit() {
    console.log("Slides : ");
    console.log(this.slides);
  }

  ngAfterViewInit() {
    var self = this;
    setTimeout(function () {
      self.scrollItems.toArray()[self.activeSlide].toggle(1);
    }, 0);
  }

  onMouseWheelUpFunc() {
    console.log("Scrolled up?" + this.activeSlide);
    if (this.activeSlide > 0) {
      this.scrollItems.toArray()[this.activeSlide].toggle(-1);
      if (this.activeSlide >= 1)
        this.scrollItems.toArray()[--this.activeSlide].toggle(-1);
      else
        this.resetToEnd();
    } else {
      this.resetToEnd();
    }
  }

  onMouseWheelDownFunc() {
    console.log("Scrolled down?" + this.activeSlide);
    if (this.activeSlide < (this.slides.length)) {
      this.scrollItems.toArray()[this.activeSlide].toggle(1);
      if (this.activeSlide < this.slides.length - 1)
        this.scrollItems.toArray()[++this.activeSlide].toggle(1);
      else { this.resetToBeginning(); }
    } else {
      this.resetToBeginning();
    }
  }

  resetToEnd() {
    console.log('Reached the beginning !' + this.activeSlide + ":" + this.slides.length);
    this.resetAll();
    this.activeSlide = this.slides.length - 1;
    this.scrollItems.toArray()[this.activeSlide].toggle(-1);
  }
  resetToBeginning() {
    console.log('Reached the end!' + this.activeSlide + ":" + this.slides.length);
    this.resetAll();
    this.activeSlide = 0;
    this.scrollItems.toArray()[this.activeSlide].toggle(1);
  }

  resetAll() {
    this.scrollItems.forEach(item => {
      item.reset();
    });
  }

}
