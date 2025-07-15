import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { IonButton } from '@ionic/angular/standalone';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { HomeService } from 'src/app/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showRecomendation: boolean = false;
  recomendation: any = null;
  temp: string = '';

  constructor(private homeService: HomeService) {}

  ngOnInit() {}

  loadRecommendation() {
    this.homeService.getRecommendation().subscribe({
      next: (response) => {
        this.showRecomendation = true;
  
        console.log('Respuesta completa:', response);
  
        this.recomendation = response.resultado;  // NO parsear
        this.temp = response.temperatura;         // Mostrar la temperatura
        console.log("ahora?",response.temperatura)
      },
      error: (error) => {
        console.error('Error al obtener recomendación:', error);
      }
    });
  }
  
  
}
