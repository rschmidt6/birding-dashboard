import { AfterViewInit, Component, effect, inject } from '@angular/core';
import * as L from 'leaflet';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BirdStateService } from '../../services/bird-state.service';
import 'leaflet.markercluster';

@Component({
  selector: 'app-map',
  imports: [SidebarComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  birdStateService = inject(BirdStateService);
  private map!: L.Map;
  private marker: L.Marker | null = null;
  private markerClusterGroup = L.markerClusterGroup();

  constructor() {
    effect(() => {
      const bird = this.birdStateService.currentBird();
      if (bird) {
        // remove previous marker if one exists
        if (this.marker) {
          this.marker.remove();
        }
        // add new marker and store reference
        this.marker = L.marker([bird.lat, bird.lng])
          .addTo(this.map)
          .bindPopup(bird.comName)
          .openPopup();

        this.map.panTo([bird.lat, bird.lng]);
      }
    });

    effect(() => {
      const birds = this.birdStateService.allBirds();
      if (birds) {
        this.markerClusterGroup.clearLayers(); // clear old markers
        birds.forEach((bird) => {
          L.marker([bird.lat, bird.lng])
            .bindPopup(bird.comName)
            .addTo(this.markerClusterGroup);
        });
        this.map.addLayer(this.markerClusterGroup);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
  private initMap(): void {
    this.map = L.map('map').setView([30.2672, -97.7431], 12.2);
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
