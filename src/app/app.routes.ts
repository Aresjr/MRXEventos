import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { IndexComponent } from './features/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { Template1Component } from './pages/template1/template1.component';

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
    ],
  },
  { path: '**', component: NotFoundComponent }
];
