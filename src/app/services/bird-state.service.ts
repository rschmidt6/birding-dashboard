import { Injectable, signal, inject } from '@angular/core';
import { Bird } from '../models/bird.model';
import { BirdDataService } from './bird-data.service';

@Injectable({
  providedIn: 'root',
})
export class BirdStateService {
  currentBird = signal<Bird | null>(null);
  allBirds = signal<Bird[] | null>(null);
  birdDataService = inject(BirdDataService);
  isLoading = signal(true);

  setAllBirds(birds: Bird[]) {
    this.allBirds.set(birds);
  }

  setCurrentBird(bird: Bird) {
    this.currentBird.set(bird);
  }

  loadBirds() {
    this.birdDataService
      .getRecentNotableObservations()
      .subscribe((data: Bird[]) => {
        this.allBirds.set(data);
        this.isLoading.set(false);
      });
  }
}
