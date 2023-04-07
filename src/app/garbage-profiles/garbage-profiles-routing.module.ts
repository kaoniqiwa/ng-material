import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderwaterComponent } from './components/underwater/underwater.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: 'underwater',
    pathMatch: "full"
  },

  {
    path: "underwater",
    component: UnderwaterComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GarbageProfilesRoutingModule { }
