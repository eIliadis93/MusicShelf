import { provideCloudinaryLoader } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SoundtrackService {
  restUrl: string;

  constructor(private http: HttpClient, private oauthService: OAuthService) {
    this.restUrl = environment.restUrl;
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept" ,
    });
  }

  singleSoundtrack(name: string): Observable<any> {
    return this.http.get<any>(
      this.restUrl + '/api/soundtrack/findByName/' + name,
      {
        headers: this.authHeader(),
      }
    );
  }

  getSongList(): Observable<any> {
    return this.http.get<any>(this.restUrl + '/api/soundtrack/allSongs', {
      headers: this.authHeader(),
    });
  }
}
