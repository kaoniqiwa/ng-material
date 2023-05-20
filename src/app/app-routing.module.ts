import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthorizationRequestService } from './common/service/authorization-request.service';
import { ResolverService } from './common/service/resolver.service';
import { RoutePath } from './app-routing.path';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutePath.login,
    pathMatch: 'full',
  },
  {
    path: RoutePath.login,
    component: LoginComponent,
  },
  {
    path: RoutePath.garbage_profiles,
    loadChildren: () =>
      import('./garbage-profiles/garbage-profiles.module').then(
        (mod) => mod.GarbageProfilesModule
      ),
    resolve: {
      test: ResolverService, // 预先拉数据,但是会在 garbage-profiles和underwater上都出现
    },
  },
  {
    path: '*',
    redirectTo: RoutePath.login,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
