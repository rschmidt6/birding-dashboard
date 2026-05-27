import { Injectable, signal, inject } from '@angular/core';
import { Bird } from '../models/bird.model';
import { BirdDataService } from './bird-data.service';
import { forkJoin } from 'rxjs';
import { Taxonomy } from '../models/taxonomy.model';

@Injectable({
  providedIn: 'root',
})
export class BirdStateService {
  selectedNotableBird = signal<Bird | null>(null);
  recentNotableBirds = signal<Bird[] | null>(null);
  fullTaxonomyList = signal<Taxonomy[] | null>(null);
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

    // caching the region species so that we dont have to get the full 18k object taxonomy every page reload
    if (cached) {
      console.log('loading ebird species taxonomy from cache...');
      this.fullTaxonomyList.set(JSON.parse(cached));
      console.log(this.fullTaxonomyList());
      return;
    }

    // fork join to wait for both the region species list as well as full taxonomy list and then merge them
    // fires in parallel
    forkJoin([
      this.birdDataService.getSpeciesList(),
      this.birdDataService.getFullTaxonomyList(),
    ]).subscribe(([codes, taxonomy]) => {
      const regionSpecies = taxonomy.filter(
        (t) => codes.includes(t.speciesCode) && t.category === 'species',
      );
      this.fullTaxonomyList.set(regionSpecies);

      try {
        localStorage.setItem(
          'ebird-region-species',
          JSON.stringify(regionSpecies),
        );
        console.log('caching species list...');
      } catch (e) {
        console.warn('too big to cache species list!');
      }
    });
  }
}
