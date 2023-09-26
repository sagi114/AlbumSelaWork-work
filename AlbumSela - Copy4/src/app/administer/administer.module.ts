import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdiministerComponent } from './adiminister/adiminister.component';
import { AdministorRoutingModule } from './administor-routing/administor-routing.module';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { PictureDetailComponent } from './home-page/picture-detail/picture-detail.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MapGoogleComponent } from './home-page/map-google/map-google.component';
import { HelloCustomerPageComponent } from './adiminister/WellcomePage/hello-customer-page/hello-customer-page.component';
import { AcceptWellcomePageComponent } from './adiminister/WellcomePage/accept-wellcome-page/accept-wellcome-page.component';
import { LibraryDetailsComponent } from './adiminister/WellcomePage/library-details/library-details.component';
import { PrivateComponent } from './adiminister/Hamborger/private/private.component';
import { CatagorysComponent } from './adiminister/Hamborger/catagorys/catagorys.component';
import { SlideShowComponent } from './adiminister/Hamborger/slide-show/slide-show.component';
import { MouseWheelDirective } from './adiminister/Hamborger/slide-show/mouse-wheel.directive';
import { ScrollSlideshowItemComponent } from './adiminister/Hamborger/slide-show/scroll-slideshow-item/scroll-slideshow-item.component';
import { AllGettingImagesComponent } from './adiminister/GetPhotos/all-getting-images/all-getting-images.component';
import { OnlineImgComponent } from './adiminister/GetPhotos/online-img/online-img.component';
import { LocalMachineComponent } from './adiminister/GetPhotos/local-machine/local-machine.component';
import { CameraComponent } from './adiminister/GetPhotos/camera/camera.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { SlideShowNewComponent } from './adiminister/Hamborger/slide-show-new/slide-show-new.component';
import { SlideshowModule } from 'ng-simple-slideshow';
// import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';




@NgModule({
  declarations: [
    AdiministerComponent,
    HomePageComponent,
    PictureDetailComponent,
    MapGoogleComponent,
    HelloCustomerPageComponent,
    AcceptWellcomePageComponent,
    LibraryDetailsComponent,
    PrivateComponent,
    CatagorysComponent,
    SlideShowComponent,
    MouseWheelDirective,
    ScrollSlideshowItemComponent,
    AllGettingImagesComponent,
    OnlineImgComponent,
    LocalMachineComponent,
    CameraComponent,
    SlideShowNewComponent,
  ]
  ,
  imports: [
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    AdministorRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDO4a8dYkyuqs_y-ev-x3NoPJuL-DZfzK4'//AIzaSyCnTZ9FAo0P-Au4dnbq0z5_BrYfhXMCl88
    }) ,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MultiSelectAllModule,
    SlideshowModule
  ]
})
export class AdministerModule { }
