import { Component } from '@angular/core';
import { DeseosService } from '../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseoService: DeseosService,
                private router: Router,
                private alertControl: AlertController) {

  }

  async agregarLista() {

    const alert = await this.alertControl.create({

      header: 'Nueva Tarea',
      inputs:[{
        name: 'Titulo',
        type: 'text',
        placeholder: 'Nombre de Tarea'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: ( data ) =>{
            console.log(data);
            if (data.Titulo.length === 0){
              return;
            }
            const listaId = this.deseoService.crearLista(data.Titulo);
            // this.deseoService.crearLista(data.Titulo);
            this.router.navigateByUrl(`tabs/tab1/agregar/${listaId}`);
          }
        }
      ]
    });

    await alert.present();

  }


}
