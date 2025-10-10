import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { IndexComponent } from './features/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { Template1Component } from './pages/template1/template1.component';
import { Template2Component } from './pages/template2/template2.component';
import { Template3Component } from './pages/template3/template3.component';
import { Template4Component } from './pages/template4/template4.component';
import { Template5Component } from './pages/template5/template5.component';
import { Template6Component } from './pages/template6/template6.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
        data: {
          title: 'Página Inicial'
        },
      },
      {
        path: 'template1',
        component: Template1Component,
        data: {
          title: 'Template 1'
        },
      },
      {
        path: 'template2',
        component: Template2Component,
        data: {
          title: 'Template 2'
        },
      },
      {
        path: 'template3',
        component: Template3Component,
        data: {
          title: 'Template 3'
        },
      },
      {
        path: 'template4',
        component: Template4Component,
        data: {
          title: 'Template 4'
        },
      },
      {
        path: 'template5',
        component: Template5Component,
        data: {
          title: 'Template 5'
        },
      },
      {
        path: 'template6',
        component: Template6Component,
        data: {
          title: 'Template 6'
        },
      },
    ],
  },
  { path: '**', component: NotFoundComponent }
];
