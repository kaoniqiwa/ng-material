import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { AccountOperationComponent } from './components/account-operation/account-operation.component';
import { CommonTimeComponent } from './components/common-time/common-time.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { ProfileStateColorPipe } from './pipe/profile-state-color.pipe';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    CommonTimeComponent,
    AccountOperationComponent,
    AccountInfoComponent,
    SideNavComponent,
    BreadcrumbComponent,

    ProfileStateColorPipe,
  ],
  exports: [
    CommonTimeComponent,
    AccountOperationComponent,
    AccountInfoComponent,
    SideNavComponent,
    BreadcrumbComponent,

    ProfileStateColorPipe,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class HowellModule {}
