import { NgModule } from "@angular/core";
import { COMPONENTS } from "./components";
import { CommonModule } from "@angular/common";



@NgModule({
  declarations: [
    COMPONENTS
  ],
  exports: [
    COMPONENTS
  ],
  imports: [
    CommonModule
  ]
})
export class HowellModule {

}