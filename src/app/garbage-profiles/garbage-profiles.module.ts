import { NgModule } from '@angular/core';
import { GarbageProfilesRoutingModule } from './garbage-profiles-routing.module';
import { HowellModule } from '../common/howell.module';
import { MonitorPlatformComponent } from './components/monitor-platform/monitor-platform.component';
import { StationArchiveComponent } from './components/station-archive/station-archive.component';
import { UnderwaterComponent } from './components/underwater/underwater.component';
import { StationProfileComponent } from './components/station-profile/station-profile.component';
import { MaintenanceProfileComponent } from './components/maintenance-profile/maintenance-profile.component';
import { MaterialProfileComponent } from './components/material-profile/material-profile.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileManagerComponent } from './components/profile-manager/profile-manager.component';
import { LanguageService } from './service/language-service';

@NgModule({
  declarations: [
    UnderwaterComponent,
    MonitorPlatformComponent,
    StationArchiveComponent,
    StationProfileComponent,
    MaintenanceProfileComponent,
    MaterialProfileComponent,
    ProfileManagerComponent,
  ],
  imports: [HowellModule, CommonModule, GarbageProfilesRoutingModule],
  providers: [
    LanguageService
  ],
})
export class GarbageProfilesModule {}
