import { BirdStateService } from './../../services/bird-state.service';
import { Component, inject, OnInit, signal, computed } from '@angular/core';
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

  searchControl = new FormControl('');
  filteredSpecies = signal<Bird[]>([]);
  speciesListCount = computed(() => {
    if (this.birdStateService.regionSpeciesList()) {
      return this.birdStateService.regionSpeciesList().length;
    }
    return 0;
  });

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

    const hasActiveRoute = this.router.url.includes('/species/');
    if (!hasActiveRoute) {
      const lastSelectedCode = this.birdStateService.selectedSpeciesCode();
      const list = this.birdStateService.regionSpeciesList();

      const defaultBird = lastSelectedCode
        ? list.find((b) => b.speciesCode === lastSelectedCode) // find last selected
        : list[0]; // fallback to first bird

      if (defaultBird) this.selectSpeciesDetail(defaultBird);
    }
  }

  selectSpeciesDetail(species: Bird) {
    this.birdStateService.selectedSpeciesCode.set(species.speciesCode);
    this.router.navigate(['/species', species.speciesCode]);
  }
}
