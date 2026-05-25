import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BirdDataService } from './services/bird-data.service';
import { Bird } from './models/bird.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  notableObservations = signal<Bird[]>([]);
  birdsShown = signal(20);
  isLoading = signal(true);

  constructor(private birdData: BirdDataService) {}
  title = 'austin-birding';

  ngOnInit() {
    this.birdData.getRecentNotableObservations().subscribe((data: Bird[]) => {
      console.log(data);
      this.notableObservations.set(data.slice(0, this.birdsShown()));
      this.isLoading.set(false);
    });

    console.log(this.notableObservations);
  }
}
