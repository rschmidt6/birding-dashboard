import { BirdStateService } from './../../services/bird-state.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Bird } from '../../models/bird.model';
@Component({
  selector: 'app-species',
  imports: [RouterOutlet],
  templateUrl: './species.component.html',
  styleUrl: './species.component.scss',
})
export class SpeciesComponent implements OnInit {
  birdStateService = inject(BirdStateService);
  router = inject(Router);
  species = this.birdStateService.regionSpeciesList;
  selectedSpecies = signal<string | null>(null);

  ngOnInit(): void {}

  selectSpeciesDetail(species: Bird) {
    this.selectedSpecies.set(species.speciesCode);
    this.router.navigate(['/species', species.speciesCode]);
  }
}
