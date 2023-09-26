import { from } from "rxjs";
import {TempleteViews} from '../Models/TempleteViews'
export class TemplatesList{
    constructor(
    public ListOfTemplates:TempleteViews[]
    ){
        // this.ListOfTemplates.push(
        //     new TempleteViews('List'),
        //     new TempleteViews('Grid')
        // )
    }
}