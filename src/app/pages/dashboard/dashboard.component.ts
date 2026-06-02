import { ChecklistsComponent } from './checklists/checklists.component';
import { Component, inject } from '@angular/core';
import { BirdStateService } from '../../services/bird-state.service';
import { KpisComponent } from './kpis/kpis.component';
import { Top100sComponent } from './top100s/top100s.component';
@Component({
  selector: 'app-dashboard',
  imports: [ChecklistsComponent, KpisComponent, Top100sComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  birdStateService = inject(BirdStateService);
}
