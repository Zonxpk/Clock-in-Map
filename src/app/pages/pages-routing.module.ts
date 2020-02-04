import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { PersonLogComponent } from './person-log/person-log.component';
import { GroupLogComponent } from './group-log/group-log.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    // {
    //   path: 'person-log',
    //   loadChildren: './person-log/person-log.module',
    // },
    {
      path: 'person-log',
      component: PersonLogComponent,
    },
    {
      path: 'date-log',
      component: GroupLogComponent,
    },
    { path: '', redirectTo: 'person-log', pathMatch: 'full' },
    { path: '**', redirectTo: 'person-log' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
