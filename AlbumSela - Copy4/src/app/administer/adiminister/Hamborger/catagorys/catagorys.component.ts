import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HambergerService } from 'src/app/hamberger-option/hamberger.service';

@Component({
  selector: 'app-catagorys',
  templateUrl: './catagorys.component.html',
  styleUrls: ['./catagorys.component.css']
})
export class CatagorysComponent implements OnInit {
  @Output() Finish = new EventEmitter<void>();
  constructor( private service:HambergerService) { }

  AddCat(cat){
    this.service.AddCatagory(cat).subscribe(l=>console.log("Added catagory"))
    this.Finish.emit();
  }
  ngOnInit(): void {
  }
  
}
