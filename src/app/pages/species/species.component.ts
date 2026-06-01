import { BirdStateService } from './../../services/bird-state.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Bird } from '../../models/bird.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-species',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './species.component.html',
  styleUrl: './species.component.scss',
})
export class SpeciesComponent implements OnInit {
  birdStateService = inject(BirdStateService);
  router = inject(Router);
  // species = this.birdStateService.regionSpeciesList;
  selectedSpecies = signal<string | null>(null);

  searchControl = new FormControl('');
  filteredSpecies = signal<Bird[]>([]);

  ngOnInit(): void {
    this.filteredSpecies.set(this.birdStateService.regionSpeciesList() ?? []);

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((term) => {
        const list = this.birdStateService.regionSpeciesList() ?? [];
        this.filteredSpecies.set(
          list.filter((b) =>
            b.comName.toLowerCase().includes(term?.toLowerCase() ?? ''),
          ),
        );
      });
  }

  selectSpeciesDetail(species: Bird) {
    this.selectedSpecies.set(species.speciesCode);
    this.router.navigate(['/species', species.speciesCode]);
  }
}
