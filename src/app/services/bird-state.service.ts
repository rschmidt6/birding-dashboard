import { Injectable, signal, inject } from '@angular/core';
import { Bird } from '../models/bird.model';
import { BirdDataService } from './bird-data.service';
import { formatYear, formatDay, formatMonth } from '../utils/date.utils';
import { ChecklistListObject } from '../models/checklist-list-object.model';
import { Top100Birder } from '../models/top100birder.model';

@Injectable({
  providedIn: 'root',
})
export class BirdStateService {
  private birdDataService = inject(BirdDataService);

  selectedNotableBird = signal<Bird | null>(null);
  recentNotableBirds = signal<Bird[] | null>(null);
  regionSpeciesList = signal<Bird[]>([]);
  isLoading = signal<boolean>(true);
  selectedSpeciesCode = signal<string | null>(null);

  //species detail state
  selectedSpecies = signal<Bird | null>(null);
  recentSightings = signal<Bird[] | null>(null);

  //dashboard state
  recentChecklists = signal<ChecklistListObject[]>([]);
  top100Today = signal<Top100Birder[]>([]);
  top100Yesterday = signal<Top100Birder[]>([]);
  todayStats = signal<{
    numChecklists: number;
    numContributors: number;
    numSpecies: number;
  } | null>(null);
  yesterdayStats = signal<{
    numChecklists: number;
    numContributors: number;
    numSpecies: number;
  } | null>(null);

  setSelectedNotableBird(bird: Bird) {
    this.selectedNotableBird.set(bird);
  }

  loadRecentNotableObservations() {
    this.birdDataService
      .getRecentNotableObservations()
      .subscribe((data: Bird[]) => {
        this.recentNotableBirds.set(
          data.map((bird) => ({
            ...bird,
            obsDt: bird.obsDt.replace(' ', 'T') + '-05:00',
          })),
        );
        this.isLoading.set(false);
      });
  }

  loadRegionSpecies() {
    const cached = localStorage.getItem('ebird-region-species');

    if (cached) {
      console.log('loading ebird species taxonomy from cache...');
      this.regionSpeciesList.set(JSON.parse(cached));
      return;
    }

    this.birdDataService.getRecentObservations().subscribe((data) => {
      this.regionSpeciesList.set(data);
      try {
        localStorage.setItem('ebird-region-species', JSON.stringify(data));
        console.log('caching region species list...');
      } catch (e) {
        console.warn('too big to cache species list!');
      }
    });
  }

  loadDashboardData() {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    //recent checklist feed
    this.birdDataService.getRecentChecklists().subscribe((data) => {
      console.log('RECENT CHECKLISTS', data);
      this.recentChecklists.set(data);
    });

    //need checklists loaded before we load this one
    //in case user wants to drill down on a checklist, can load them like a list with dropdown capability
    this.birdDataService.getChecklist('S351409430').subscribe((data) => {
      console.log('CHECKLIST', data);
    });

    //top 100 birders of today, will also do yesterday
    this.birdDataService
      .getTop100(formatYear(now), formatMonth(now), formatDay(now))
      .subscribe((data) => {
        console.log('T TOP 100', data);
        this.top100Today.set(data);
      });

    //top 100 yesterday
    this.birdDataService
      .getTop100(
        formatYear(yesterday),
        formatMonth(yesterday),
        formatDay(yesterday),
      )
      .subscribe((data) => {
        console.log('Y TOP 100', data);
        this.top100Yesterday.set(data);
      });

    //birding stats of today, will also do yesterday in smaller text below
    this.birdDataService
      .getRegionalStatsOnADate(
        formatYear(now),
        formatMonth(now),
        formatDay(now),
      )
      .subscribe((data) => {
        console.log('T  sSTATS:', data);
        this.todayStats.set(data);
      });

    //stats yesterday
    this.birdDataService
      .getRegionalStatsOnADate(
        formatYear(yesterday),
        formatMonth(yesterday),
        formatDay(yesterday),
      )
      .subscribe((data) => {
        console.log('Y STATS:', data);
        this.yesterdayStats.set(data);
      });

    //not sure what to do with historical data right now, might just leave it. there doesnt seem to be a way to tell what is a notable sighting from this data
    // this.birdDataService
    //   .getHistoricObsOnADate(formatYear(now), month(now), day(now))
    //   .subscribe((data) => {
    //     console.log('HIST', data);
    //   });
  }
}
