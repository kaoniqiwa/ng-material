import { NgModule } from '@angular/core';
import { GarbageProfilesRoutingModule } from './garbage-profiles-routing.module';
import { HowellModule } from '../common/howell.module';
import { MonitorPlatformComponent } from './components/monitor-platform/monitor-platform.component';
import { StationArchiveComponent } from './components/station-archive/station-archive.component';
import { UnderwaterComponent } from './components/underwater/underwater.component';
import { StationProfileManagerComponent } from './components/station-profile-manager/station-profile-manager.component';
import { MaintenanceProfileComponent } from './components/maintenance-profile/maintenance-profile.component';
import { MaterialProfileComponent } from './components/material-profile/material-profile.component';

@NgModule({
  declarations: [
    UnderwaterComponent,
    MonitorPlatformComponent,
    StationArchiveComponent,
    StationProfileManagerComponent,
    MaintenanceProfileComponent,
    MaterialProfileComponent,
  ],
  imports: [HowellModule, GarbageProfilesRoutingModule],
})
export class GarbageProfilesModule {}
