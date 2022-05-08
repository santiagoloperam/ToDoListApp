import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { Actividad, Categoria } from '../../interfaces/interfaces';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
})
export class ActividadesPage implements OnInit {

  actividades: Actividad[];
  categorias: Categoria[];

  constructor( private actividadesService: ActividadesService,
               private modalCtrl: ModalController,
               private ui: UiServiceService,
               private alertCtrl: AlertController,
               private uiService: UiServiceService,
               private navCtrl: NavController ) { }

               
  actualizando: Boolean = false;
    
  ngOnInit() {
    this.actividadesService.getActividades()
        .subscribe( async resp => {
          console.log("resp");
          console.log(resp);
          //await this.actividadesService.storageActividades( resp.actividades );
          //this.actividades = await this.actividadesService.getStorageActividades();
          this.actividades = resp.actividades;
          this.categorias = resp.categorias;
        });
  }

  logout() {
      this.ui.logoutAlert();
  }

  

  async refrescar() {
    // No se usa uiService para el alert porque necesito recibir la misma data que en onInit
    const alert = await this.alertCtrl.create({
      message: 'Va a refrescar la lista de Actividades. Si desea continuar presione OK',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          }
        }, {
          text: 'OK',
          handler: () => {
            this.actividadesService.getActividades()
            .subscribe( resp => {
              console.log(resp);
              this.actividades = resp.actividades;
              this.categorias = resp.categorias;
        });
          }
        }
      ]
    });

    await alert.present();
  }

  async updateEstado( actividad: Actividad) {
    const alert = await this.alertCtrl.create({
      message: 'Presione OK para darla como realizada',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          }
        }, {
          text: 'OK',
          handler: () => {
            this.actualizando = true; // Poner en la vista el refresher de update visita con el ngif
            actividad.estado = 2; // Ya queda dibujado el visita estado = 2 pero toca precionar el icono de este evento

            try{ 
              this.actividadesService.updateActividad(actividad)
                .subscribe( async resp => {
                  if ( resp['success'] ) {
                    this.uiService.presentToast('Actividad Realizada'); // Visita actualizada
                    this.actualizando = false;
                  } else {
                    this.uiService.presentToast('Registro fallido'); // Visita NO actualizada
                    this.actualizando = false;
                    return;
                  }
                });
            
              } catch{
                  this.uiService.presentToast('Error al cargar'); // Visita NO actualizada
                  this.actualizando = false;
                }
                this.actualizando = false;
                  }
                }
              ]
            });

            await alert.present();
            
          
    }
  }



