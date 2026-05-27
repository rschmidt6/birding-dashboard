import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BirdStateService } from './services/bird-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  birdStateService = inject(BirdStateService);
  ngOnInit(): void {
    this.birdStateService.loadRecentNotableObservations();
    this.birdStateService.loadRegionSpecies();
  }
}
