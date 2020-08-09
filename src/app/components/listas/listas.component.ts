import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild(IonList) lista: IonList;
  constructor( public deseosservice: DeseosService,
               public router: Router,
               private alertControl: AlertController) { }

  ngOnInit() {}

  listaSeleccionada(lista: Lista){

    if (this.terminada){
      this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista){
    this.deseosservice.borrarLista(lista);
  }

  async editarNombre(lista: Lista){

    const alert = await this.alertControl.create({

      header: 'Editar Tarea',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de Tarea'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            console.log(data);
            if (data.titulo.length === 0){
              return;
            }
            lista.titulo = data.titulo;
            this.deseosservice.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    await alert.present();
  }

}
