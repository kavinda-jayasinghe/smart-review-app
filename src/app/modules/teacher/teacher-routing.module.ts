import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherBaseComponent } from './components/teacher-base/teacher-base.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { ClassesComponent } from './components/classes/classes.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ClassDetails } from './components/class-details/class-details';

const routes: Routes = [
  {
    path: '',
    component: TeacherBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: TeacherDashboardComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'support', component: ClassesComponent },
      { path: 'message', component: MessagesComponent },
      { path: 'classes/:id', component: ClassDetails }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
