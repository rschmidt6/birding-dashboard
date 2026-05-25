import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bird } from '../models/bird.model';

@Injectable({
  providedIn: 'root',
})
export class BirdDataService {
  private apiKey = '52hmur36h0mr';
  private baseUrl = 'https://api.ebird.org/v2';
  private regionCode = 'US-TX-453';

  constructor(private http: HttpClient) {}

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

  getHotspots() {
    return this.http.get(`{${this.baseUrl}/ref/hotspot/${this.regionCode}`);
  }
}
