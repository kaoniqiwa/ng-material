import { NgModule } from '@angular/core';
import { GarbageProfilesRoutingModule } from './garbage-profiles-routing.module';
import { COMPONENTS } from './components';
import { HowellModule } from '../common/howell.module';

@NgModule({
  declarations: [COMPONENTS],
  imports: [HowellModule, GarbageProfilesRoutingModule],
})
export class GarbageProfilesModule { }
