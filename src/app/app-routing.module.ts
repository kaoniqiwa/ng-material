import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthorizationRequestService } from './common/service/authorization-request.service';
import { RouterPath } from './enum/router.enum';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';
import { LanguageResolverService } from './common/service/language-resolver.service';

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
    // resolve: {
    //   test: LanguageResolverService, // 预先拉数据,但是会在 garbage-profiles和underwater上都出现
    // },
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
