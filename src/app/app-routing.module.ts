import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/actividades/actividades.module').then( m => m.ActividadesPageModule),
    canLoad: [ UsuarioGuard ]
  },
  {
    path: '',
    redirectTo: 'actividades',
    pathMatch: 'full'
  },
  {
    path: 'login', //NO HAY LOGOUT PORQUE AL BORRAR EL STORAGE QUEDA SIN JWT
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'actividades',
    loadChildren: () => import('./pages/actividades/actividades.module').then( m => m.ActividadesPageModule),
    // canActivate: [ UsuarioGuard ]
    canLoad: [ UsuarioGuard ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
