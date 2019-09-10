import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { UserComponent } from './user/user.component';
import { PersonLogComponent } from './person-log/person-log.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'example-nd',
      loadChildren: './example-nd/example-nd.module',
    },
    // {
    //   path: 'person-log',
    //   loadChildren: './person-log/person-log.module',
    // },
    {
      path: 'user',
      component: UserComponent,
    },
    {
      path: 'person-log',
      component: PersonLogComponent,
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
