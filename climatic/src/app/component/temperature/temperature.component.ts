import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonProgressBar } from '@ionic/angular/standalone';
import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
  imports: [CommonModule, IonAccordion, IonAccordionGroup, IonItem, IonLabel,IonProgressBar],
})
export class TemperatureComponent {
  @Input() clima: any; 

  constructor() {}

  ngOnInit() {
    this.clima = null
  }
}
