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
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ThemifyIconComponent } from './components/themify-icon/themify-icon.component';
import { IconfontIconComponent } from './components/iconfont-icon/iconfont-icon.component';

@NgModule({
  declarations: [
    CommonTimeComponent,
    AccountOperationComponent,
    AccountInfoComponent,
    SideNavComponent,
    BreadcrumbComponent,
    CustomTableComponent,
    PaginatorComponent,
    ThemifyIconComponent,
    IconfontIconComponent,

    ProfileStateColorPipe,
  ],
  exports: [
    CommonTimeComponent,
    AccountOperationComponent,
    AccountInfoComponent,
    SideNavComponent,
    BreadcrumbComponent,
    CustomTableComponent,
    PaginatorComponent,
    ThemifyIconComponent,
    IconfontIconComponent,

    ProfileStateColorPipe,
  ],
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule],
  providers: [],
})
export class HowellModule {}
