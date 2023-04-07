import { NgModule } from '@angular/core';
import { GarbageProfilesRoutingModule } from './garbage-profiles-routing.module';
import { COMPONENTS } from './components';



@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    GarbageProfilesRoutingModule
  ]
})
export class GarbageProfilesModule { }
