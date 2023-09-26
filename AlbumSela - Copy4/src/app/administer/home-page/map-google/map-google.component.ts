import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-map-google',
  templateUrl: './map-google.component.html',
  styleUrls: ['./map-google.component.css']
})
export class MapGoogleComponent implements OnInit {
  public lat:number = 51.678418;
  public lng:number = 7.809007;
  destroyed: boolean = false;
  @Output() returnLat = new EventEmitter<number>();
  @Output() returnLng = new EventEmitter<number>();
  @Input() lngInput:number;
  @Input() latInput:number;

  getInputLocation(){
    console.log(this.latInput);
    console.log(this.lngInput);
    
    
    if(this.latInput!==0)this.lat=this.latInput
    if(this.lngInput!==0)this.lng=this.lngInput
  }
  constructor(private ref: ChangeDetectorRef) { 
    this.getInputLocation();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }

  ngOnInit(): void {
    this.getCurrentLocation();
  }
  returnLocation(){
    this.returnLat.emit(this.lat)
    this.returnLng.emit(this.lng)
  }

  getCurrentLocation() {
    // this if exist becurse the user can deny access to location
    if (navigator.geolocation) {
      //getting current latitude & longitude using web api
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map) {
    // sets the location to where the user clicked
    this.lat = latLng.lat();
    this.lng = latLng.lng();

    console.log(this.lat)
    console.log(this.lng)

    this.returnLocation();

    // make sure to update component
    if (!this.destroyed)
      this.ref.detectChanges();
  }

  // on mao ready
  mapReady(map) {
    // add event listener to click on map
    map.addListener("click", (e) => {
      // pass clicked position and the map ref
      this.placeMarkerAndPanTo(e.latLng, map);
    });
  }
}
