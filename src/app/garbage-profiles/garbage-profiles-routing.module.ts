import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderwaterComponent } from './components/underwater/underwater.component';
import { HowellModule } from '../common/howell.module';
import { MonitorPlatformComponent } from './components/monitor-platform/monitor-platform.component';
import { StationArchiveComponent } from './components/station-archive/station-archive.component';
import { StationProfileComponent } from './components/station-profile/station-profile.component';
import { MaterialProfileComponent } from './components/material-profile/material-profile.component';
import { MaintenanceProfileComponent } from './components/maintenance-profile/maintenance-profile.component';
import { ProfileManagerComponent } from './components/profile-manager/profile-manager.component';
import { CookieGuard } from '../common/service/cookie.guard';
import { AuthGuard } from '../common/service/auth.guard';
import { DeactivateGuard } from '../common/service/deactivate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'underwater',
    pathMatch: 'full',
  },

  {
    path: 'underwater',
    component: UnderwaterComponent,
    canActivate: [AuthGuard, CookieGuard],
    canActivateChild: [AuthGuard, CookieGuard],

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
            data: {
              breadcrumb: '垃圾厢房档案',
            },
            children: [
              {
                path: '',
                redirectTo: 'station-profile',
                pathMatch: 'full',
              },
              {
                path: 'station-profile',
                component: StationProfileComponent,
                data: {
                  breadcrumb: '厢房档案',
                },
                children: [
                  {
                    path: 'profile-manager',
                    component: ProfileManagerComponent,
                    canDeactivate: [DeactivateGuard],

                    data: {
                      breadcrumb: '档案管理',
                    },
                  },
                ],
              },
              {
                path: 'material-profile',
                component: MaterialProfileComponent,
                data: {
                  breadcrumb: '物料档案',
                },
              },
              {
                path: 'maintenance-profile',
                component: MaintenanceProfileComponent,
                data: {
                  breadcrumb: '维修工档案',
                },
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
