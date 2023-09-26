import { WebcamImage } from 'ngx-webcam';
import {CatagoryModel} from './CatagoryModel';
export interface PictureModel{
    
    id:number;
    information:{
        url:string;
        picturName:string
        Catagory:CatagoryModel[];
        location:{
            lat:number;
            lng:number;
        }
        pictur:string;
        Favorite:boolean;
        privateMode:boolean;
    }
}