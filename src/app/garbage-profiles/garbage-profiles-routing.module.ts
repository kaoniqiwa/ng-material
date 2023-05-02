import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderwaterComponent } from './components/underwater/underwater.component';
import { HowellModule } from '../common/howell.module';
import { MonitorPlatformComponent } from './components/monitor-platform/monitor-platform.component';
import { StationArchiveComponent } from './components/station-archive/station-archive.component';
import { StationProfileManagerComponent } from './components/station-profile-manager/station-profile-manager.component';

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
                redirectTo: 'station-profile-manager',
                pathMatch: 'full',
              },
              {
                path: 'station-profile-manager',
                component: StationProfileManagerComponent,
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
