import { BirdDataService } from './../../services/bird-data.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { BirdStateService } from '../../services/bird-state.service';
import { ActivatedRoute } from '@angular/router';
import { Bird } from '../../models/bird.model';

@Component({
  selector: 'app-species-detail',
  imports: [],
  templateUrl: './species-detail.component.html',
  styleUrl: './species-detail.component.scss',
})
export class SpeciesDetailComponent implements OnInit {
  birdStateService = inject(BirdStateService);
  birdDataService = inject(BirdDataService);
  private route = inject(ActivatedRoute);

  selectedSpecies = signal<Bird | null>(null);
  recentSightings = signal<Bird[] | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const speciesCode = params['id'];

      const species = this.birdStateService
        .regionSpeciesList()
        ?.find((t) => t.speciesCode === speciesCode);

      this.selectedSpecies.set(species ?? null);

      this.birdDataService
        .getRecentNearbySpeciesObservations(speciesCode)
        .subscribe((data) => {
          this.recentSightings.set(data);
        });
    });
  }
}
