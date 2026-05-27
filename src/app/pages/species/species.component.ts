import { BirdStateService } from './../../services/bird-state.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-species',
  imports: [],
  templateUrl: './species.component.html',
  styleUrl: './species.component.scss',
})
export class SpeciesComponent implements OnInit {
  birdStateService = inject(BirdStateService);

  birds = this.birdStateService.fullTaxonomyList;

  ngOnInit(): void {}
}
