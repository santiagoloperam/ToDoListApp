import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { Storage } from '@ionic/storage';
import { RootObject, Actividad } from '../interfaces/interfaces';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  usuario = {};
  token = null;

  constructor( private http: HttpClient,
               private usuarioService: UsuarioService,
               private storage: Storage) {
    this.usuario = this.usuarioService.usuario;
    this.token = this.usuarioService.token;
  }

  getActividades() { // Se llama al inicio y al refrescar la lista de actividades

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      // 'Accept-Encoding': 'gzip,deflate,br',
      // 'Connection': 'keep-alive',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${ this.token }`
    });

    return this.http.get<RootObject>( `${ URL }/auth/actividades`, { headers } );

    // return this.http.get(`${ URL }/api/auth/visitas/user?pagina=${ this.paginaVisitas }`);

  }

  storageActividades( actividades: Actividad[] ) {
    this.storage.set('actividades', actividades);
  }

  getStorageActividades() {
    return this.storage.get('actividaes');  }

  updateActividad(actividad: Actividad) {
    const headers = new HttpHeaders({      
      'Authorization': `Bearer ${ this.token }`
    });

      return this.http.put( `${ URL }/auth/actividades/update/${ actividad.id }`, { headers } );
  }


}
