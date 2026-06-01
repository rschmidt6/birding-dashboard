import { Component, effect, inject } from '@angular/core';
import { BirdStateService } from '../../../services/bird-state.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-species-map',
  imports: [],
  templateUrl: './species-map.component.html',
  styleUrl: './species-map.component.scss',
})
export class SpeciesMapComponent {
  birdStateService = inject(BirdStateService);
  private map!: L.Map;
  private markers: L.Marker[] = []; // track all markers so we can clear them

  constructor() {
    effect(() => {
      const birds = this.birdStateService.recentSightings();
      if (birds && this.map) {
        // remove all existing markers before adding new ones
        this.markers.forEach((m) => m.remove());
        this.markers = [];

        birds.forEach((bird) => {
          const marker = L.marker([bird.lat, bird.lng])
            .bindPopup(bird.locName)
            .addTo(this.map);
          this.markers.push(marker); // store reference for cleanup
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('species-map', {
      zoomControl: false,
    }).setView([30.35, -97.7431], 10);

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }
}
