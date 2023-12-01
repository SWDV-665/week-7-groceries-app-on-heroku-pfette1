import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesService } from './groceries.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogService {

  constructor(
    private alertController: AlertController,
    public dataService: GroceriesService  ) { }

  async showPrompt(toast: HTMLIonToastElement, item?: any, index?: number, id?: any) {
    const alert = await this.alertController.create({
      header: item? 'Edit Item' : 'Add Item',
      subHeader: item? 'Please edit item...' : 'Please enter an item...',
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
          }
        },
        {
          text: 'Save',
          handler: (item: any) => {
            if (index !== undefined) {
              this.dataService.editItem(item, index, id);
            } else {
              this.dataService.addItem(item)
            }
            toast.present();
          }
        }
      ],
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item? item.name: null
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          min: 1,
          max: 100,
          value: item? item.quantity: null
        }
      ]
    });

    await alert.present();
  }
}
