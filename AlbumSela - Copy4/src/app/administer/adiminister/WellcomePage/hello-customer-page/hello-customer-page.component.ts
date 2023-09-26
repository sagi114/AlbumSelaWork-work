import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hello-customer-page',
  templateUrl: './hello-customer-page.component.html',
  styleUrls: ['./hello-customer-page.component.css']
})
export class HelloCustomerPageComponent implements OnInit {
  @Output() Finish = new EventEmitter<void>();
  constructor() { }
  GoToNextPage(){
    this.Finish.emit();
}

  ngOnInit(): void {
  }
  
}
