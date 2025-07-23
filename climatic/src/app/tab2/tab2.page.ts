import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { TemperatureComponent } from '../component/temperature/temperature.component';
import { TemperatureService } from '../component/temperature/service/temperature.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [TemperatureComponent, IonHeader, IonToolbar, IonTitle, IonContent]
})

export class Tab2Page {
  clima: any = null;

  constructor(private temperature: TemperatureService) {}

  ionViewWillEnter() {
    this.clima = null
    this.temperature.getTemperature().subscribe({
      next: (res) => {
        // console.log('Clima actualizado en Tab2Page:', res);
        this.clima = res;
        console.log("aver",this.clima)
      },
      error: (error) => {
        console.error('Error al obtener el clima:', error);
      }
    });
  }

}

