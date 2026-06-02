import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bird } from '../models/bird.model';
import { Taxonomy } from '../models/taxonomy.model';
import { ChecklistListObject } from '../models/checklist-list-object.model';
import { Checklist } from '../models/checklist.model';
import { Top100Birder } from '../models/top100birder.model';

@Injectable({
  providedIn: 'root',
})
export class BirdDataService {
  private apiKey = '52hmur36h0mr';
  private baseUrl = 'https://api.ebird.org/v2';
  private regionCode = 'US-TX-453';
  private stateRegionCode = 'US-TX';
  private travisCountyLatLong = [30.2672, -97.7431];

  constructor(private http: HttpClient) {}

  // getFullTaxonomyList() {
  //   return this.http.get<Taxonomy[]>(
  //     `${this.baseUrl}/ref/taxonomy/ebird?fmt=json`,
  //     {
  //       headers: { 'X-eBirdApiToken': this.apiKey },
  //     },
  //   );
  // }

  getSpeciesList() {
    return this.http.get<string[]>(
      `${this.baseUrl}/product/spplist/${this.regionCode}`,
      {
        headers: { 'X-eBirdApiToken': this.apiKey },
      },
    );
  }

  getRecentObservations() {
    return this.http.get<Bird[]>(
      `${this.baseUrl}/data/obs/${this.regionCode}/recent`,
      {
        headers: { 'X-eBirdApiToken': this.apiKey },
      },
    );
  }

  getRecentNotableObservations() {
    return this.http.get<Bird[]>(
      `${this.baseUrl}/data/obs/${this.regionCode}/recent/notable`,
      {
        headers: { 'X-eBirdApiToken': this.apiKey },
      },
    );
  }

  getRecentNearbySpeciesObservations(speciesCode: string) {
    return this.http.get<Bird[]>(
      `${this.baseUrl}/data/obs/${this.regionCode}/recent/${speciesCode}`,
      {
        headers: { 'X-eBirdApiToken': this.apiKey },
      },
    );
  }

  getRecentChecklists() {
    return this.http.get<ChecklistListObject[]>(
      `${this.baseUrl}/product/lists/${this.regionCode}`,
      {
        headers: { 'X-eBirdApiToken': this.apiKey },
      },
    );
  }

  getChecklist(subId: string) {
    return this.http.get<Checklist>(
      `${this.baseUrl}/product/checklist/view/${subId}`,
      {
        headers: { 'X-eBirdApiToken': this.apiKey },
      },
    );
  }

  getTop100(year: string, month: string, day: string) {
    //need to add in types on the gets for all below
    return this.http.get<Top100Birder[]>(
      `${this.baseUrl}/product/top100/${this.stateRegionCode}/${year}/${month}/${day}`,
      {
        headers: { 'X-eBirdApiToken': this.apiKey },
      },
    );
  }

  getRegionalStatsOnADate(year: string, month: string, day: string) {
    return this.http.get<{
      numChecklists: number;
      numContributors: number;
      numSpecies: number;
    }>(
      `${this.baseUrl}/product/stats/${this.regionCode}/${year}/${month}/${day}`,
      {
        headers: { 'X-eBirdApiToken': this.apiKey },
      },
    );
  }

  // getHistoricObsOnADate(year: string, month: string, day: string) {
  //   return this.http.get(
  //     `${this.baseUrl}/data/obs/${this.regionCode}/historic/${year}/${month}/${day}`,
  //     {
  //       headers: { 'X-eBirdApiToken': this.apiKey },
  //     },
  //   );
  // }
}
