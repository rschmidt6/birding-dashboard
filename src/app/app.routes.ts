import { Routes } from '@angular/router';
import { Path } from 'leaflet';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'map',
    loadComponent: () =>
      import('./pages/map/map.component').then((m) => m.MapComponent),
  },
  {
    path: 'species',
    loadComponent: () =>
      import('./pages/species/species.component').then(
        (m) => m.SpeciesComponent,
      ),
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/species-detail/species-detail.component').then(
            (m) => m.SpeciesDetailComponent,
          ),
      },
    ],
  },
];
