import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
  imports: [CommonModule, IonAccordion, IonAccordionGroup, IonItem, IonLabel]
})
export class TemperatureComponent {
  @Input() clima: any; // recibe el pronóstico

  constructor() {}


  
}
