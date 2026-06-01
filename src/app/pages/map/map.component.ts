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
  private markers: L.Marker[] = [];

  constructor() {
    effect(() => {
      const bird = this.birdStateService.selectedNotableBird();
      if (bird && this.map) {
        console.log(bird);
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
      const birds = this.birdStateService.recentNotableBirds();
      if (birds && this.map) {
        this.markers.forEach((m) => m.remove());
        this.markers = [];
        birds.forEach((bird) => {
          const marker = L.marker([bird.lat, bird.lng])
            .bindPopup(bird.comName)
            .addTo(this.map);
          this.markers.push(marker);
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
  private initMap(): void {
    this.map = L.map('map', {
      zoomControl: false, // disable default position
    }).setView([30.3, -97.95], 10);

    // add zoom controls back to bottom right
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

    // manually trigger marker loading after map is ready
    const birds = this.birdStateService.recentNotableBirds();
    if (birds.length) {
      birds.forEach((bird) => {
        L.marker([bird.lat, bird.lng])
          .bindPopup(bird.comName)
          .addTo(this.markerClusterGroup);
      });
      this.map.addLayer(this.markerClusterGroup);
    }
  }
}
