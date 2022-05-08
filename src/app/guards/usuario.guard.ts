import { Injectable } from '@angular/core';
import { UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad { //EN VEZ DE INTERCEPTORS usuarioGuard deja cargar una pagina si pasa validaToken() 
  // de usuarioService y usuarioGuard deja pasar o no en el app-routing.module

  constructor( private usuarioService: UsuarioService ) {}

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  // canLoad(): Promise<boolean> {
    console.log('Entro a guard UsuarioGuard');

    return this.usuarioService.validaToken();
  }

 /*  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return false;
  } */

}
