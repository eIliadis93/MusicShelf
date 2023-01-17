import { Component, OnChanges, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Soundtrack } from 'src/app/models/soundtrack';
import { SoundtrackService } from 'src/app/services/soundtrack.service';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { SoundtrackDto } from 'src/app/models/soundtrackDto';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.scss'],
})
export class MusicplayerComponent implements OnInit, OnChanges {
  soundtrackName: string = '';
  restUrl: string;
  soundtrack: Soundtrack;
  playList: Soundtrack[] = [];
  audio = new Audio();
  selectedFiles?: FileList;
  progress = 0;
  message = '';
  currentFile?: File;

  constructor(
    private soundtrackService: SoundtrackService,
    private oauthService: OAuthService
  ) {
    this.soundtrack = new Soundtrack('', '', '', '', '', '');
    this.restUrl = environment.restUrl;
  }

  ngOnInit(): void {
    this.getPlaylist();
    console.log(this.token);
  }

  ngOnChanges() {
    this.getPlaylist();
  }

  getPlaylist() {
    this.soundtrackService.getSongList().subscribe({
      next: (result) => {
        console.log(result);
        this.playList = result;
      },
    });
  }

  downloadSoundtrack(soundtrackName: string) {
    this.soundtrackService
      .downloadSoundtrack(soundtrackName)
      .subscribe((blob) => {
        if (blob.size === 0) {
          console.log('File is wrong');
        } else {
          saveAs(blob, soundtrackName);
        }
      });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadSoundtrack(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.soundtrackService.uploadSong(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  get token() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}
