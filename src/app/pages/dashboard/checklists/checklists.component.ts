import { Component, inject } from '@angular/core';
import { BirdStateService } from '../../../services/bird-state.service';

@Component({
  selector: 'app-checklists',
  imports: [],
  templateUrl: './checklists.component.html',
  styleUrl: './checklists.component.scss',
})
export class ChecklistsComponent {
  birdStateService = inject(BirdStateService);
}
