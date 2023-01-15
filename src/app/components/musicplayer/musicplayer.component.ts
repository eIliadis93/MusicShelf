import { Component, OnChanges, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Soundtrack } from 'src/app/models/soundtrack';
import { SoundtrackService } from 'src/app/services/soundtrack.service';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.scss'],
})
export class MusicplayerComponent implements OnInit,OnChanges {
  soundtrackName: string = '';
  restUrl: string;
  soundtrack: Soundtrack;
  playList: Soundtrack[] = [];
  audio = new Audio();

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

  ngOnChanges(){
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

  uploadSoundtrack(soundtrack: {artist: string, soundtrack: File}){

  }

  get token() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}
