import { provideCloudinaryLoader } from '@angular/common';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SoundtrackDto } from '../models/soundtrackDto';

@Injectable({
  providedIn: 'root',
})
export class SoundtrackService {
  restUrl: string;
  soundtrackDto!: SoundtrackDto;

  constructor(private http: HttpClient, private oauthService: OAuthService) {
    this.restUrl = environment.restUrl;
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.oauthService.getAccessToken()}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
      ContentType: 'application/json',
      'Content-Type': 'multipartFile/form-data'
    });
  }

  downloadSoundtrack(name: string): Observable<Blob> {
    console.log(`${this.restUrl}/api/soundtrack/${name}`);
    return this.http.get<Blob>(`${this.restUrl}/api/soundtrack/${name}`, {
      headers: this.authHeader(),
      reportProgress: true,
      responseType: 'blob' as 'json',
    });
  }

  getSongList(): Observable<any> {
    return this.http.get<any>(this.restUrl + '/api/soundtrack/allSongs', {
      headers: this.authHeader(),
    });
  }

  uploadSong(formData: FormData): Observable<any> {
    return this.http.post<HttpEvent<{}>>(this.restUrl + '/api/soundtrack', formData, {
      headers: this.authHeader(),
      reportProgress: true,
      responseType: 'blob' as 'json',
    });
  }
}
