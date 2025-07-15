import { Component, OnInit } from '@angular/core';
import { TemperatureService } from './service/temperature.service';
@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
})
export class TemperatureComponent  implements OnInit {

  constructor(private temperature: TemperatureService) { }

  ngOnInit() {
    this.temperature.getTemperature().subscribe({
      next: (res) => {
        console.log(res)

      },
      error: (error) => {
        console.error('Error al obtener recomendación:', error);
      }
    });
  }

}
