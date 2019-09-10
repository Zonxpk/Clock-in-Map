import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonLogComponent } from './person-log.component';
import { ListViewComponent } from './list-view/list-view.component';

const routes: Routes = [
  {
    path: '',
    // component: ProductListComponent,
    component: PersonLogComponent,
    children: [
      {
        path: 'list',
        component: ListViewComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class PersonLogRoutingModule{

}
