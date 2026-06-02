import { Component, inject } from '@angular/core';
import { BirdStateService } from '../../../services/bird-state.service';

@Component({
  selector: 'app-kpis',
  imports: [],
  templateUrl: './kpis.component.html',
  styleUrl: './kpis.component.scss',
})
export class KpisComponent {
  birdStateService = inject(BirdStateService);
}
