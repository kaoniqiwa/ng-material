import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderwaterComponent } from './components/underwater/underwater.component';
import { HowellModule } from '../common/howell.module';
import { MonitorPlatformComponent } from './components/monitor-platform/monitor-platform.component';
import { StationArchiveComponent } from './components/station-archive/station-archive.component';
import { StationProfileManagerComponent } from './components/station-profile-manager/station-profile-manager.component';
import { MaterialProfileComponent } from './components/material-profile/material-profile.component';
import { MaintenanceProfileComponent } from './components/maintenance-profile/maintenance-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'underwater',
    pathMatch: 'full',
  },

  {
    path: 'underwater',
    component: UnderwaterComponent,
    children: [
      {
        path: '',
        redirectTo: 'monitor-platform',
        pathMatch: 'full',
      },
      {
        path: 'monitor-platform',
        component: MonitorPlatformComponent,
        children: [
          {
            path: '',
            redirectTo: 'station-archive',
            pathMatch: 'full',
          },
          {
            path: 'station-archive',
            component: StationArchiveComponent,
            children: [
              {
                path: '',
                redirectTo: 'station-profile',
                pathMatch: 'full',
              },
              {
                path: 'station-profile',
                component: StationProfileManagerComponent,
              },
              {
                path: 'material-profile',
                component: MaterialProfileComponent,
              },
              {
                path: 'maintenance-profile',
                component: MaintenanceProfileComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GarbageProfilesRoutingModule {}
