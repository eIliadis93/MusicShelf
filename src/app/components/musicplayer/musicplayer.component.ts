import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Soundtrack } from 'src/app/models/soundtrack';
import { SoundtrackService } from 'src/app/services/soundtrack.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.scss'],
})
export class MusicplayerComponent implements OnInit {
  audioObj = new Audio();
  soundtrackName: string = '';

  soundtrack!: Soundtrack;
  playList!: Soundtrack[];

  constructor(
    private soundtrackService: SoundtrackService,
    private oauthService: OAuthService
  ) {}

  ngOnInit(): void {
    this.getPlaylist();
    console.log(this.token);
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
    this.soundtrackService.downloadSoundtrack(soundtrackName).subscribe(blob => {
      if(blob.size === 0){
        console.log("File is wrong");
      }
      else{
        saveAs(blob, soundtrackName);
      }
      
    })
  }

  get token() {
    let claims: any = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}
