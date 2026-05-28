import { Taxonomy } from '../../models/taxonomy.model';
import { BirdStateService } from './../../services/bird-state.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-species',
  imports: [RouterOutlet],
  templateUrl: './species.component.html',
  styleUrl: './species.component.scss',
})
export class SpeciesComponent implements OnInit {
  birdStateService = inject(BirdStateService);
  router = inject(Router);
  species = this.birdStateService.fullTaxonomyList;
  selectedSpecies = signal<string | null>(null);

  ngOnInit(): void {}

  selectSpeciesDetail(species: Taxonomy) {
    this.selectedSpecies.set(species.speciesCode);
    this.router.navigate(['/species', species.speciesCode]);
  }
}
