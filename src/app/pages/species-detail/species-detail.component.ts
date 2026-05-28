import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BirdStateService } from '../../services/bird-state.service';
import { ActivatedRoute } from '@angular/router';
import { Taxonomy } from '../../models/taxonomy.model';

@Component({
  selector: 'app-species-detail',
  imports: [],
  templateUrl: './species-detail.component.html',
  styleUrl: './species-detail.component.scss',
})
export class SpeciesDetailComponent implements OnInit {
  birdStateService = inject(BirdStateService);
  private route = inject(ActivatedRoute);
  selectedSpecies = signal<Taxonomy | null>(null);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const speciesCode = params['id'];

      const species = this.birdStateService
        .fullTaxonomyList()
        ?.find((t) => t.speciesCode === speciesCode);

      this.selectedSpecies.set(species ?? null);
    });
  }
}
