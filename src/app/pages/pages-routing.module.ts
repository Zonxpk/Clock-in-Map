import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExampleComponent } from './example/example.component';
import { ExampleNdComponent } from './example-nd/example-nd.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'example-nd',
      loadChildren: () => import('./example-nd/example-nd.module')
        .then(m => m.ExampleNdModule),
    },

    // {
    //   path: 'example-nd',
    //   loadChildren: () => import('./example-nd/example-nd.module')
    //     .then(m => m.ExampleNdModule),
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
