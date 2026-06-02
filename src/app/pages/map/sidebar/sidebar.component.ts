import { inject, signal, Component, OnInit } from '@angular/core';
import { Bird } from '../../../models/bird.model';
import { DatePipe } from '@angular/common';
import { BirdStateService } from '../../../services/bird-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [DatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private birdStateService = inject(BirdStateService);

  isLoading = this.birdStateService.isLoading;
  notableObservations = this.birdStateService.recentNotableBirds;

  selectBird(bird: Bird) {
    this.birdStateService.setSelectedNotableBird(bird);
  }
}
