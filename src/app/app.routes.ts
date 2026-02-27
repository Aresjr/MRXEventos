import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { IndexComponent } from './features/index/index.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './pages/admin/admin.component';

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
    ],
  },
  {
    path: 'adm',
    component: AdminComponent,
    data: {
      title: 'Administração'
    }
  },
  { path: '**', component: NotFoundComponent }
];
