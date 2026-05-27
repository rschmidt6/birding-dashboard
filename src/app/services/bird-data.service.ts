import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bird } from '../models/bird.model';
import { Taxonomy } from '../models/taxonomy.model';

@Injectable({
  providedIn: 'root',
})
export class BirdDataService {
  private apiKey = '52hmur36h0mr';
  private baseUrl = 'https://api.ebird.org/v2';
  private regionCode = 'US-TX-453';

  constructor(private http: HttpClient) {}

  getFullTaxonomyList() {
    return this.http.get<Taxonomy[]>(
      `${this.baseUrl}/ref/taxonomy/ebird?fmt=json`,
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

  // getHotspots() {
  //   return this.http.get(`{${this.baseUrl}/ref/hotspot/${this.regionCode}`);
  // }

  getSpeciesList() {
    return this.http.get<string>(
      `${this.baseUrl}/product/spplist/${this.regionCode}`,
      {
        headers: { 'X-eBirdApiToken': this.apiKey },
      },
    );
  }
}
