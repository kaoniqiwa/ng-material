import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthorizationRequestService } from './common/service/authorization-request.service';
import { RouterPath } from './enum/router.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: RouterPath.login,
    pathMatch: 'full',
  },
  {
    path: RouterPath.login,
    component: LoginComponent,
  },
  {
    path: RouterPath.garbage_profiles,
    loadChildren: () =>
      import('./garbage-profiles/garbage-profiles.module').then(
        (mod) => mod.GarbageProfilesModule
      ),
    canActivate: [AuthorizationRequestService],
  },
  {
    path: '*',
    redirectTo: RouterPath.login,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
