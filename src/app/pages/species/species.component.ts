import { Component, inject, OnInit } from '@angular/core';
import { BirdDataService } from '../../services/bird-data.service';

@Component({
  selector: 'app-species',
  imports: [],
  templateUrl: './species.component.html',
  styleUrl: './species.component.scss',
})
export class SpeciesComponent implements OnInit {
  birdDataService = inject(BirdDataService);

  ngOnInit(): void {
    this.birdDataService.getSpeciesList().subscribe((data) => {
      console.log(data);
    });
  }
}
