import { Injectable, signal, inject } from '@angular/core';
import { Bird } from '../models/bird.model';
import { BirdDataService } from './bird-data.service';

@Injectable({
  providedIn: 'root',
})
export class BirdStateService {
  selectedNotableBird = signal<Bird | null>(null);
  recentNotableBirds = signal<Bird[] | null>(null);
  regionSpeciesList = signal<Bird[] | null>(null);
  isLoading = signal<boolean>(true);

  private birdDataService = inject(BirdDataService);

  setselectedNotableBird(bird: Bird) {
    this.selectedNotableBird.set(bird);
  }

  loadRecentNotableObservations() {
    this.birdDataService
      .getRecentNotableObservations()
      .subscribe((data: Bird[]) => {
        this.recentNotableBirds.set(
          data.map((bird) => ({
            ...bird,
            obsDt: bird.obsDt.replace(' ', 'T') + '-05:00',
          })),
        );
        this.isLoading.set(false);
      });
  }

  loadRegionSpecies() {
    const cached = localStorage.getItem('ebird-region-species');

    if (cached) {
      console.log('loading ebird species taxonomy from cache...');
      this.regionSpeciesList.set(JSON.parse(cached));
      console.log(this.regionSpeciesList());
      return;
    }

    this.birdDataService.getRecentObservations().subscribe((data) => {
      try {
        localStorage.setItem('ebird-region-species', JSON.stringify(data));
        console.log('caching region species list...');
      } catch (e) {
        console.warn('too big to cache species list!');
      }
    });
  }
}
