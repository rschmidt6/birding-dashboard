import { Component, inject, signal } from '@angular/core';
import { BirdStateService } from '../../../services/bird-state.service';

@Component({
  selector: 'app-top100s',
  imports: [],
  templateUrl: './top100s.component.html',
  styleUrl: './top100s.component.scss',
})
export class Top100sComponent {
  birdStateService = inject(BirdStateService);

  activeTab = signal<'today' | 'yesterday'>('today');
}
